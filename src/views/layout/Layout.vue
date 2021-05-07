<template>
  <div>
    <Header></Header>
    <div class="main-container container-lg">
      <router-view/>
    </div>
    <Footer></Footer>
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
  mounted () {
    this.walletInit()
  },
  methods: {
    ...mapActions(MODULE_NAMES.WALLET, {
      walletInit: WALLET_ACTION_TYPES.INIT_WALLET
    })
  }
}
</script>

<style scoped lang="scss">
  .main-container {
    margin: 80px auto 60px auto;
    max-width: 1168px;
    padding: 2rem 1rem;

  }
</style>
