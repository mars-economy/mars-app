<template>
  <div>
    <template  v-if="!isWalletConnected">
      <Button name="Connect wallet" color="primary" @click="toggleWalletPanel"></Button>
    </template>
    <template  v-else>
    </template>

    <OverlayPanel ref="walletPanel">
      <WalletPanel :isWallet="isWalletConnected"></WalletPanel>
    </OverlayPanel>
  </div>
</template>

<script>
import OverlayPanel from 'primevue/overlaypanel'
import WalletPanel from '@/views/layout/header/Wallet/walletPanel'

export default {
  name: 'Wallet',
  components: {
    WalletPanel,
    OverlayPanel
  },
  data () {
    return {
      isWalletConnected: false
    }
  },
  methods: {
    toggleWalletPanel (event) {
      this.$refs.walletPanel.toggle(event)
    }
  }
}
</script>
<style scoped>

</style>
