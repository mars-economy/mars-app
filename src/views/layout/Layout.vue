<template>
  <div>
    <Header :isMobile="isMobile"></Header>
    <div class="container-lg" :class="isMobile ? 'main-container-mobile' : 'main-container'">
      <template v-if="isWrongNetwork">
          <MessageCard type="wrong-network" :isMobile="isMobile"></MessageCard>
      </template>
      <router-view :isMobile="isMobile" v-else/>
    </div>
    <Footer v-if="!isMobile"></Footer>
  </div>
</template>

<script>
import Header from '@/views/layout/header/Header.vue'
import Footer from '@/views/layout/footer/Footer'
import apolloMixin from '@/mixins/apollo.mixins'
import { mapActions } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { WALLET_ACTION_TYPES } from '@/store/modules/wallet/wallet.module'
import engineMixins from '@/mixins/engine.mixins'
import MessageCard from './MessageCard'

export default {
  name: 'Layout',
  mixins: [apolloMixin, engineMixins],
  components: {
    MessageCard,
    Footer,
    Header
  },
  data: function () {
    return {
      screenSm: 576,
      isMobile: window.innerWidth < 576,
      isWrongNetwork: false
    }
  },
  watch: {
    '$store.state.wallet.isNetworkSupported': {
      async handler (val) {
        this.isWrongNetwork = !val
      },
      immediate: true
    }
  },
  mounted () {
    this.initWeb3Engine()
    this.walletInit()
    window.onresize = () => {
      this.onScreenResize()
    }
  },
  methods: {
    ...mapActions(MODULE_NAMES.WALLET, {
      walletInit: WALLET_ACTION_TYPES.INIT_WALLET,
      initWeb3Engine: WALLET_ACTION_TYPES.INIT_WEB_3_ENGINE
    }),
    onScreenResize: function () {
      this.isMobile = window.innerWidth <= this.screenSm
    }
  }
}
</script>

<style scoped lang="scss">
  .main-container {
    margin: 60px auto 48px auto;
    max-width: 1168px;
    padding: 2rem 1rem;
  }
  .main-container-mobile {
    width: 100%;
    padding: 20px 24px;
  }

</style>
