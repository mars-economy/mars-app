<template>
  <div class="wallet-panel-body">
    <WalletConnector v-for="(connector, id, i) in connectorList"
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
  }
}
</script>

<style scoped>
  .connector + .connector {
    margin-top: 24px;
  }
</style>
