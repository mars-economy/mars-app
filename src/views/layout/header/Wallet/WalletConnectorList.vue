<template>
  <div class="wallet-panel-body">
    <WalletConnector v-for="(connector, id, i) in getWalletList"
                     :key="i"
                     :connector="connector" @click="walletLogin(connector.id)">
    </WalletConnector>
  </div>
</template>

<script>
import connectors from '@/helpers/connectors.json'
import { mapActions } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { WALLET_ACTION_TYPES } from '@/store/modules/wallet/wallet.module'
import WalletConnector from './WalletConnector'
import { isMobile as detectIsMobile } from 'mobile-device-detect'

export default {
  name: 'WalletConnectorList',
  components: {
    WalletConnector
  },
  data () {
    return {
      connectorList: connectors
    }
  },
  methods: {
    ...mapActions(MODULE_NAMES.WALLET, {
      walletLogin: WALLET_ACTION_TYPES.WALLET_LOGIN
    })
  },
  computed: {
    getWalletList () {
      const wallets = []
      const showOption = detectIsMobile ? 'isMobile' : 'isBrowser'
      Object.keys(connectors).forEach(item => {
        if (connectors[item].detect.includes(showOption)) {
          wallets.push(connectors[item])
        }
      })
      return wallets
    }
  }
}
</script>

<style scoped>
  .connector + .connector {
    margin-top: 24px;
  }
</style>
