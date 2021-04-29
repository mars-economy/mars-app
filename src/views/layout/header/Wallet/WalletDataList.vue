<template>
  <div class="wallet-panel-body">

    <div class="wallet-data-item p-mb-3">
      <div class="label p-mb-1">You wallet</div>
      <div class="p-d-flex p-ai-center">
        <Icon class="p-mr-2" name="wallet" size="16"/>
        <div class="data-item-text">{{ walletData.walletName }}</div>
      </div>
    </div>

    <div class="wallet-data-item mb-3">
      <div class="label p-mb-1">Connected with</div>
      <div class="p-d-flex p-ai-center">
        <img :alt="walletData.connectorName" :src="walletData.connectorIcon" class="p-mr-2" style="height: 16px">
        <span>{{ walletData.connectorName }}</span>
      </div>
    </div>

    <Divider class="p-my-3" type="solid"/>

    <div class="p-d-flex p-flex-column">
      <ActionLink class="muted" label="Change wallet" @click="onChangeWallet()"/>
      <ActionLink class="muted p-mt-3" label="Disconnect wallet" @click="walletLogout()"/>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { WALLET_ACTION_TYPES } from '@/store/modules/wallet/wallet.module'

export default {
  name: 'WalletDataList',
  props: {
    walletData: Object
  },
  methods: {
    ...mapActions(MODULE_NAMES.WALLET, {
      walletLogout: WALLET_ACTION_TYPES.WALLET_LOGOUT
    }),
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
