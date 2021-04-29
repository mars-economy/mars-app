<template>
  <div class="outcome card">
    <div class="card-header p-py-3 p-d-flex p-ai-center p-jc-between text-primary">
      <div>{{ outcome.name }}</div>
      <Probability :value=outcome.probability />
    </div>
    <div class="card-profit p-py-2">
      <TextPair :data="outcome.profit+'%'" label="estimated profit" icon="profit" />
    </div>

    <div class="card-body p-py-3" v-if="isWalletConnected" >
      <Button @click="openWalletPanel($event)"
              label="Connect wallet" class="btn-primary btn-block" />
    </div>
    <div v-else>
      <Order></Order>
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
import Order from '@/views/pages/Milestone/components/stake/Order'
export default {
  name: 'PredictionOutcome',
  components: {
    Order,
    WalletPanel
  },
  props: {
    outcome: Object
  },
  data: function () {
    return {
      isWalletConnected: false
    }
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
