<template>
  <div>
    <button v-for="(connector, id, i) in connectors" :key="i" @click="walletLogin(connector.id)">
      <img :alt="connector.name" :src="connector.icon" height="40">{{ connector.name }}
    </button>
    <br>
    <button @click="walletLogout()">LOGOUT</button>
  </div>
</template>

<script>
import connectors from '@/helpers/connectors.json'
import { mapActions } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { WALLET_ACTION_TYPES } from '@/store/modules/wallet/wallet.module'

export default {
  data () {
    return {
      connectors: connectors
    }
  },
  mounted () {
    this.walletInit()
  },
  methods: {
    ...mapActions(MODULE_NAMES.WALLET, {
      walletLogin: WALLET_ACTION_TYPES.WALLET_LOGIN,
      walletLogout: WALLET_ACTION_TYPES.WALLET_LOGOUT,
      walletInit: WALLET_ACTION_TYPES.INIT_WALLET
    })
  }
}
</script>
