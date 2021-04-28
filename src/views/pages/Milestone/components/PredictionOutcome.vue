<template>
  <div class="outcome card">
    <div class="card-header p-py-3 p-d-flex p-ai-center p-jc-between text-primary">
      <div>{{ outcome.name }}</div>
      <Probability :value=outcome.probability />
    </div>
    <div class="card-profit p-py-2">
      <TextPair :data="outcome.profit+'%'" label="estimated profit" icon="profit" />
    </div>
    <div class="card-body p-py-3">
      <Button label="Connect wallet" class="btn-primary btn-block" @click="openWalletPanel($event)" />
    </div>
    <div class="card-footer-collapse">
      <PanelCollapse header="Show more" headerAlt="Show less" headerPos="right" :panelId="outcome.id" collapsed>
        <TextPair :data="outcome.stake" label="total stake" icon="coins" />
      </PanelCollapse>
    </div>

    <OverlayPanel ref="walletPanel" class="wallet-panel">
      <WalletPanel :walletData=null />
    </OverlayPanel>

  </div>

</template>

<script>
import WalletPanel from '@/views/layout/header/Wallet/WalletPanel'
export default {
  name: 'PredictionOutcome',
  components: {
    WalletPanel
  },
  props: {
    outcome: Object
  },
  methods: {
    openWalletPanel (event) {
      this.$refs.walletPanel.show(event)
    }
  }
}
</script>

<style scoped lang="scss">
  .outcome {
    width: 47%;
  }

</style>
