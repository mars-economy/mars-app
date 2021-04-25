<template>
  <span class="p-buttonset" id="wallet-data" @click="toggleWalletPanel($event)">
    <Button class="btn-light-stroke btn-small">
      <img :src="getConnectorIcon()" class="p-mr-2" style="height: 14px" :alt="walletData.walletName">
      <span>{{walletData.walletName}}</span>
    </Button>
    <Button :label="getConnectorName()" class="btn-light btn-small" />

    <OverlayPanel ref="walletDataList">
      <WalletDataList :walletData="walletData" />
    </OverlayPanel>

  </span>
</template>

<script>
import OverlayPanel from 'primevue/overlaypanel'
import WalletDataList from './WalletDataList'
export default {
  name: 'WalletDataButton',
  components: {
    WalletDataList,
    OverlayPanel
  },
  data: function () {
    return {
      walletData: {
        walletName: '0x641c8fe...',
        connectorIcon: '/images/connectors/metamask-icon.svg',
        connectorName: 'MetaMask'
      }
    }
  },
  methods: {
    getConnectorName () {
      console.log(this.walletData.connectorName)
      return this.walletData.connectorName.toString()
    },
    getConnectorIcon () {
      return this.walletData.connectorIcon
    },
    toggleWalletPanel (event) {
      this.$refs.walletDataList.toggle(event)
    }
  }
}
</script>

<style scoped>
  .p-button {
    text-transform: none;
  }

</style>
