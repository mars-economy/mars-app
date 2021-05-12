<template>
  <div class="outcome card" :class="{'mobile' : isMobile}">
    <div class="card-header p-py-3 p-d-flex p-ai-center p-jc-between text-primary">
      <div>{{ outcome.name }}</div>
      <Probability :value="probability"/>
    </div>
    <div class="card-profit p-py-2 p-d-flex p-ai-center">
      <TextPair :data="estimatedProfit" unit="%" icon="profit" label="estimated profit"/>
    </div>

    <div v-if="!$store.state.wallet.isInjected" class="card-body p-py-3">
      <Button @click="openWalletPanel($event)"
              class="btn-primary btn-block" label="Connect wallet"/>
    </div>
    <div v-else>
      <Order :outcome="outcome"
             :prediction="outcome.getParent()"
             :isMobile="isMobile"
             v-on:update:profit="estimatedProfit = $event"></Order>
    </div>

    <div class="card-footer-collapse">
      <PanelCollapse header="Show more" headerAlt="Show less" headerPos="right" :panelId="outcome.id" collapsed>
        <TextPair :data="fromWei(outcome.stakedAmount)" unit="BUSD" icon="coins" label="total stake"/>
      </PanelCollapse>
    </div>

    <OverlayPanel ref="walletPanel" class="wallet-panel" :class="{'mobile' : isMobile}">
      <WalletPanel :walletData="null"/>
    </OverlayPanel>

  </div>

</template>

<script>
import WalletPanel from '@/views/layout/header/Wallet/WalletPanel'
import Order from '@/views/pages/Milestone/components/stake/Order'
import { convertFromWei } from '@/utils/contract'
import BigNumber from 'bignumber.js'

export default {
  name: 'PredictionOutcome',
  components: {
    Order,
    WalletPanel
  },
  props: {
    outcome: Object,
    isMobile: Boolean
  },
  data: function () {
    return {
      isWalletConnected: false,
      estimatedProfit: 0
    }
  },
  methods: {
    openWalletPanel (event) {
      this.$refs.walletPanel.show(event)
    },
    fromWei (stakedAmount) {
      return convertFromWei(stakedAmount)
    }
  },
  computed: {
    probability () {
      const probability = new BigNumber(this.outcome.stakedAmount)
        .dividedBy(this.outcome.getParent().totalStakeAmount)
        .multipliedBy(100)
      return probability.isNaN() ? 0 : probability.toNumber().toFixed(0)
    }
  }
}
</script>

<style scoped lang="scss">
  .outcome.mobile {
    border: 1px solid rgba($colorPrimary, 0.5);

  }

</style>
