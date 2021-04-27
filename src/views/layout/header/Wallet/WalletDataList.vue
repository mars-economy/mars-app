<template>
    <div class="wallet-panel-body">

      <div class="wallet-data-item p-mb-3">
        <div class="label p-mb-1">You wallet</div>
        <div class="p-d-flex p-ai-center">
          <Icon name="wallet" size="16" class="p-mr-2" />
          <div class="data-item-text">{{walletData.walletName}}</div>
        </div>
      </div>

      <div class="wallet-data-item mb-3">
        <div class="label p-mb-1">Connected with</div>
        <div class="p-d-flex p-ai-center">
          <img :src="walletData.connectorIcon" class="p-mr-2" style="height: 16px" :alt="walletData.connectorName">
          <span>{{walletData.connectorName}}</span>
        </div>
      </div>

      <Divider class="p-my-3" type="solid" />

      <div class="p-d-flex p-flex-column">
        <ActionLink label="Change wallet" class="muted" @click="onChangeWallet()" />
        <ActionLink label="Disconnect wallet" class="muted p-mt-3" @click="walletLogout()" />
      </div>

    </div>
</template>

<script>
export default {
  name: 'WalletDataList',
  props: {
    walletData: Object
  },
  methods: {
    onChangeWallet () {
      this.$emit('changeWallet')
    }
  }
}
</script>

<style scoped lang="scss">
  .wallet-data-item {
    .label {
      opacity: 0.5;
    }
  }
  .action-link:hover {
    opacity: 1;
  }

</style>
