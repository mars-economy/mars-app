<template>
  <div>
    <template  v-if="!isWalletConnect">
      <Button
        label="Connect wallet"
        iconPos="right"
        class="btn-primary btn-small"
        @click="toggleWalletPanel($event)">
      </Button>

      <OverlayPanel ref="walletConnectorList">
        <WalletConnectorList :isWallet="isWalletConnect" />
      </OverlayPanel>
    </template>

    <template  v-else>
      <WalletDataButton></WalletDataButton>
    </template>

  </div>
</template>

<script>
import OverlayPanel from 'primevue/overlaypanel'
import WalletDataButton from './WalletDataButton'
import WalletConnectorList from './WalletConnectorList'

export default {
  name: 'Wallet',
  components: {
    WalletConnectorList,
    WalletDataButton,
    OverlayPanel
  },
  data () {
    return {
      isWalletConnect: true
    }
  },
  methods: {
    toggleWalletPanel (event) {
      this.$refs.walletConnectorList.toggle(event)
    }
  }
}
</script>
<style scoped>

</style>
