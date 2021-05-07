<template>
  <div class="order">
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

    <div class="order-block p-py-3">
      <CardLabel label="current order" labelPos="right"/>
      <TextPair :data="currentStake.amount"  unit="BUSD" class="p-mt-2" icon="coins" label="your stake"/>
      <TextPair :data="calculateEstimatedWin().toString()" unit="BUSD" class="p-mt-2" icon="win" label="estimated win"/>
      <Divider type="solid" class="p-my-3"/>
      <template v-if="isShow">
        <StakeInput :outcome="outcome" :v-model="userStake" v-on:update:stake="handleUpdateStake($event)"></StakeInput>
        <Button :disabled="isLimit || isInvalid || !userStake" class="btn-primary btn-block p-my-2" label="Place a stake"
              @click="doContract()"/>
        <InfoMessage v-if="isLimit" color="primary" small text="You don’t have enough tokens in your wallet"
                   type="warning"/>
        <InfoMessage v-if="isInvalid" color="primary" small text="Invalid Input"
                   type="warning"/>
      </template>
      <template v-if="isProgress">
       <Loader message="We are checking your wallet. Please wait for a moment" class="p-mt-3"/>
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
    totalStakeAmount: BigNumber
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
        win: null
      },
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
        win: 111
      }
    }
  },
  methods: {
    ...mapActions(MODULE_NAMES.PHASES, {
      getAllData: PHASES_ACTION_TYPES.GET_DATA
    }),
    ...mapActions(MODULE_NAMES.CONTRACTS, {
      buyOutcome: CONTRACTS_ACTION_TYPES.BUY_OUTCOME
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
      const fee = 0.003
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
      const fee = 0.003
      const newStake = new BigNumber(this.userStake).multipliedBy(1 - fee)
      const totalStakeAmount = new BigNumber(convertFromWei(this.prediction.totalStakeAmount))
      const stakedAmount = new BigNumber(convertFromWei(this.outcome.stakedAmount))

      const estLeft = newStake.plus(totalStakeAmount)
      const estRight = newStake.plus(stakedAmount)
      let estimatedWin = (estLeft.dividedBy(estRight)).multipliedBy(newStake)

      estimatedWin = estimatedWin.isNaN() || +estimatedWin.valueOf() === Infinity ? new BigNumber(0) : estimatedWin
      return estimatedWin
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
        win: convertFromWei(stake.currentReward)
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
    @extend %card-px;
  }

</style>
