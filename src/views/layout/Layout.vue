<template>
  <div>
    <Header :isMobile="isMobile"></Header>
    <div class="container-lg" :class="isMobile ? 'main-container-mobile' : 'main-container'">
      <router-view :isMobile="isMobile" />
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

export default {
  name: 'Layout',
  mixins: [apolloMixin],
  components: {
    Footer,
    Header
  },
  data: function () {
    return {
      screenSm: 576,
      isMobile: window.innerWidth < 576
    }
  },
  mounted () {
    this.walletInit()
    window.onresize = () => {
      this.onScreenResize()
    }
  },
  methods: {
    ...mapActions(MODULE_NAMES.WALLET, {
      walletInit: WALLET_ACTION_TYPES.INIT_WALLET
    }),
    onScreenResize: function () {
      this.isMobile = window.innerWidth <= this.screenSm
    }
  }
}
</script>

<style scoped lang="scss">
  .main-container {
    margin: 80px auto 60px auto;
    max-width: 1168px;
    padding: 2rem 1rem;
  }
  .main-container-mobile {
    width: 100%;
    padding: 20px 24px;
  }

</style>
