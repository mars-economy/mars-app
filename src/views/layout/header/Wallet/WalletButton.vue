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

    <template v-if="$store.state.wallet.isInjected">
      <WalletDataButton :walletData="getWalletData" @click="toggleWalletPanel($event)"></WalletDataButton>
    </template>

    <OverlayPanel ref="walletPanel" class="wallet-panel" :class="{'mobile' : isMobile}">
      <WalletPanel :walletData="getWalletData" @onSelectWallet="toggleWalletPanel($event)"/>
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
  props: {
    isMobile: Boolean
  },
  data () {
    return {
      isWalletConnect: this.$store.state.wallet.isInjected,
      isWalletPanelOpen: false
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
<style scoped lang="scss">
  .wallet-panel-mobile {
    &.collapsed {
      display: none;
    }
    transition: all 0.3s;
  }
</style>
