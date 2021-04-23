<template>
  <div class="wallet-panel-container">
    <div class="wallet-panel-body">
      <template v-if="!isWallet">
      <div v-for="(connector, id, i) in connectors" :key="i" @click="walletLogin(connector.id)">
        <img :alt="connector.name" :src="connector.icon" height="40">{{ connector.name }}
      </div>
      <br>
      </template>
      <template v-else>
        <button @click="walletLogout()">LOGOUT</button>
      </template>
    </div>
  </div>

</template>

<script>
import connectors from '@/helpers/connectors.json'
import { mapActions } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { WALLET_ACTION_TYPES } from '@/store/modules/wallet/wallet.module'

export default {
  name: 'walletPanel',
  props: {
    isWallet: Boolean
  },
  data () {
    return {
      connectors: connectors,
      isWalletConnected: false
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

<style scoped lang="scss">

.wallet-panel-container {
  background: rgba($white, 0.03);
  border: 1px solid rgba($white, 0.05);
  box-sizing: border-box;
  backdrop-filter: blur(20px);
  border-radius: 0 0 $radius-base $radius-base;
  max-width: 10rem;
  padding: 1rem;
}
</style>
