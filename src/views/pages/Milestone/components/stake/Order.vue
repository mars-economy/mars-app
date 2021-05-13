<template>
  <div class="order p-d-flex p-flex-column" :class="{'mobile' : isMobile}">
    <template v-if="isStakeSuccess()">
      <div class="order-block p-py-3">
        <CardLabel color="primary" label="your stake" labelPos="right"/>
        <TextPair :color="'primary'" :data="yourTotalStake.amount" unit="BUSD" class="p-mt-2" icon="coins"
                  label="your total stake"/>
        <TextPair :color="'primary'" :data="yourTotalStake.win" unit="BUSD" class="p-mt-2" icon="win"
                  label="total estimated win"/>
      </div>
      <Divider type="solid"/>
    </template>

    <div v-if="prediction.state === 'Open' && !yourTotalStake.suspended" class="order-block p-py-3">
      <CardLabel label="current order" labelPos="right"/>
      <TextPair :data="calculateEstimatedAmount(currentStake.amount)" class="p-mt-2" icon="coins" label="your stake"
                unit="BUSD"/>
      <TextPair :data="calculateEstimatedWin().toString()" unit="BUSD" class="p-mt-2" icon="win" label="estimated win"/>
      <Divider type="solid" class="p-my-3"/>
      <template v-if="isShow">
        <StakeInput :outcome="outcome" :v-model="userStake" v-on:update:stake="handleUpdateStake($event)"></StakeInput>
        <Button :disabled="isLimit || isInvalid || !userStake" class="btn-primary btn-block p-my-2"
                label="Place a stake"
                @click="doContract()"/>
        <InfoMessage v-if="isLimit" color="primary" small text="You don’t have enough tokens in your wallet"
                     type="warning"/>
        <InfoMessage v-if="isInvalid" color="primary" small text="Invalid Input"
                     type="warning"/>
      </template>
      <template v-if="isProgress">
        <Loader class="p-mt-3" message="We are checking your wallet. Please wait for a moment"/>
      </template>
    </div>
    <div v-if="prediction.state === 'Closed' && yourTotalStake.win > 0" class="order-block p-py-3">
      <Button :label="`Get reward ${yourTotalStake.win} BUSD`"
              class="btn-primary btn-block p-my-2"
              v-on:click="doGetReward($event)"/>
      <template v-if="isProgress">
        <Loader class="p-mt-3" message="We are checking your wallet. Please wait for a moment"/>
      </template>
    </div>
  </div>

</template>

<script>
import StakeInput from '@/views/pages/Milestone/components/stake/StakeInput'
import { mapActions } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { CONTRACTS_ACTION_TYPES } from '@/store/modules/contracts/contracts.module'
import { WALLET_ACTION_TYPES } from '@/store/modules/wallet/wallet.module'
import BigNumber from 'bignumber.js'
import { convertFromWei } from '@/utils/contract'
import { PHASES_ACTION_TYPES } from '@/store/modules/phases/phases.module'

export default {
  name: 'Order',
  components: {
    StakeInput
  },
  props: {
    prediction: Object,
    outcome: Object,
    totalStakeAmount: BigNumber,
    isMobile: Boolean
  },
  data: function () {
    return {
      isShow: true,
      isProgress: false,
      userStake: 0,
      isLimit: false,
      isInvalid: false,
      yourTotalStake: {
        amount: null,
        win: null,
        suspended: false
      },
      fee: process.env.VUE_APP_BASE_FEE || 0.003,
      currentStake: {
        amount: 0,
        win: 0
      }
    }
  },
  watch: {
    userStake: function (val) {
      const win = new BigNumber(this.outcome.stakedAmount).dividedBy(new BigNumber(val))
      this.currentStake = {
        amount: +val || 0,
        win: win
      }
    }
  },
  methods: {
    ...mapActions(MODULE_NAMES.PHASES, {
      getAllData: PHASES_ACTION_TYPES.GET_DATA
    }),
    ...mapActions(MODULE_NAMES.CONTRACTS, {
      buyOutcome: CONTRACTS_ACTION_TYPES.BUY_OUTCOME,
      getRewards: CONTRACTS_ACTION_TYPES.GET_REWARDS
    }),
    ...mapActions(MODULE_NAMES.WALLET, {
      getWalletBalances: WALLET_ACTION_TYPES.GET_WALLET_BALANCES
    }),
    updateLimit (userStake) {
      this.isLimit = new BigNumber(userStake).gt(convertFromWei(this.$store.state.wallet.balanceBUSD))
    },
    updateIsValid (userStake) {
      this.isInvalid = !!isNaN(userStake)
    },
    calculateEstimatedProfit () {
      const fee = this.fee
      const newStake = new BigNumber(this.userStake).multipliedBy(1 - fee)
      const totalStakeAmount = new BigNumber(convertFromWei(this.prediction.totalStakeAmount))
      const stakedAmount = new BigNumber(convertFromWei(this.outcome.stakedAmount))

      const estLeft = newStake.plus(totalStakeAmount)
      const estRight = newStake.plus(stakedAmount)

      let estimatedProfit = ((estLeft.dividedBy(estRight)).minus(1)).multipliedBy(100)
      estimatedProfit = estimatedProfit.isNaN() || +estimatedProfit.valueOf() === Infinity ? new BigNumber(0) : estimatedProfit
      this.$emit('update:profit', estimatedProfit.toNumber().toFixed(0))
    },
    calculateEstimatedWin () {
      const fee = this.fee
      const newStake = new BigNumber(this.userStake).multipliedBy(1 - fee)
      const totalStakeAmount = new BigNumber(convertFromWei(this.prediction.totalStakeAmount))
      const stakedAmount = new BigNumber(convertFromWei(this.outcome.stakedAmount))

      const estLeft = newStake.plus(totalStakeAmount)
      const estRight = newStake.plus(stakedAmount)
      let estimatedWin = (estLeft.dividedBy(estRight)).multipliedBy(newStake)

      estimatedWin = estimatedWin.isNaN() || +estimatedWin.valueOf() === Infinity ? new BigNumber(0) : estimatedWin
      return estimatedWin
    },
    calculateEstimatedAmount (amount) {
      return new BigNumber(amount).multipliedBy(1 - this.fee).valueOf()
    },
    handleUpdateStake ($event) {
      this.userStake = $event
      this.updateIsValid(this.userStake)
      this.updateLimit(this.userStake)
      this.calculateEstimatedProfit()
    },
    isStakeSuccess () {
      if (!this.prediction.stakes) return false
      const stake = this.prediction.stakes.find(item => item.outcomeUuid === this.outcome.id)
      this.yourTotalStake = {
        amount: convertFromWei(stake.stakeAmount),
        win: convertFromWei(stake.currentReward),
        suspended: stake.suspended
      }
      return stake ? new BigNumber(stake.stakeAmount).gt(0) : false
    },
    async doContract () {
      this.isShow = false
      this.isProgress = true
      await this.buyOutcome({
        prediction: this.prediction,
        outcome: this.outcome,
        stake: this.userStake
      })
      await this.getWalletBalances(this.prediction.token)
      await this.getAllData()
      this.isProgress = false
      this.isShow = true
      this.userStake = 0
    },
    async doGetReward ($event) {
      this.isProgress = true
      await this.getRewards({
        prediction: this.prediction,
        outcome: this.outcome,
        reward: this.yourTotalStake
      })
      await this.getWalletBalances(this.prediction.token)
      await this.getAllData()
      this.isProgress = false
    }
  },
  mounted () {
    this.calculateEstimatedProfit()
  }
}
</script>

<style scoped lang="scss">
  .order-block {
    position: relative;
    display: flex;
    flex-direction: column;
    @extend %card-px;
  }

  .mobile .order-block {
    @extend %card-mobile-px;
  }

</style>
