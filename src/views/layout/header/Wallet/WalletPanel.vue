<template>
    <div class="wallet-panel-container">
      <div class="wallet-panel-body">
        <WalletConnectorList v-if="!isWallet"></WalletConnectorList>

        <WalletDataList v-else :walletData="walletData" @changeWallet="onChangeWallet()"></WalletDataList>
      </div>
    </div>
</template>

<script>
import WalletConnectorList from './WalletConnectorList'
import WalletDataList from './WalletDataList'
export default {
  name: 'WalletPanel',
  components: {
    WalletDataList,
    WalletConnectorList
  },
  props: {
    walletData: null
  },
  data: function () {
    return {
      isWallet: false
    }
  },
  methods: {
    isWalletData () {
      if (this.walletData) {
        this.isWallet = true
      }
    },
    onChangeWallet () {
      this.isWallet = false
    }
  },
  mounted () {
    this.isWalletData()
  }
}
</script>

<style scoped>

</style>
