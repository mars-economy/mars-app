<template>
  <div>
    <template v-if="!$store.state.wallet.isInjected">
      <Button
        label="Connect wallet"
        iconPos="right"
        class="btn-primary btn-small"
        @click="toggleWalletPanel($event)">
      </Button>
    </template>

    <template v-else>
      <WalletDataButton :walletData="getWalletData" @click="toggleWalletPanel($event)"></WalletDataButton>
    </template>

    <OverlayPanel ref="walletPanel" class="wallet-panel">
      <WalletPanel :walletData="getWalletData"/>
    </OverlayPanel>

  </div>
</template>

<script>
import OverlayPanel from 'primevue/overlaypanel'
import WalletDataButton from './WalletDataButton'
import WalletPanel from './WalletPanel'
import { mapGetters } from 'vuex'
import { MODULE_NAMES } from '@/store'

export default {
  name: 'Wallet',
  components: {
    WalletPanel,
    WalletDataButton,
    OverlayPanel
  },
  data () {
    return {
      isWalletConnect: this.$store.state.wallet.isInjected
    }
  },
  methods: {
    toggleWalletPanel (event) {
      this.$refs.walletPanel.toggle(event)
    }
  },
  computed: {
    ...mapGetters(MODULE_NAMES.WALLET, {
      getWalletData: 'getWalletData'
    })
  }
}
</script>
<style scoped>

</style>
