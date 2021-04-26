<template>
  <div>
    <template v-if="!isWalletConnect">
      <Button
        label="Connect wallet"
        iconPos="right"
        class="btn-primary btn-small"
        @click="toggleWalletPanel($event)">
      </Button>
    </template>

    <template  v-else>
      <WalletDataButton @click="toggleWalletPanel($event)" :walletData="walletData"></WalletDataButton>
    </template>

    <OverlayPanel ref="walletPanel">
      <WalletPanel :walletData="getWalletData()" />
    </OverlayPanel>

  </div>
</template>

<script>
import OverlayPanel from 'primevue/overlaypanel'
import WalletDataButton from './WalletDataButton'
import WalletPanel from './WalletPanel'

export default {
  name: 'Wallet',
  components: {
    WalletPanel,
    WalletDataButton,
    OverlayPanel
  },
  data () {
    return {
      isWalletConnect: true,
      walletData: {
        walletName: '0x641c8fe...',
        connectorIcon: '/images/connectors/metamask-icon.svg',
        connectorName: 'MetaMask'
      }
    }
  },
  methods: {
    toggleWalletPanel (event) {
      this.$refs.walletPanel.toggle(event)
    },
    getWalletData () {
      return this.isWalletConnect ? this.walletData : null
    }
  }
}
</script>
<style scoped>

</style>
