import { mapActions } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { PHASES_ACTION_TYPES } from '@/store/modules/phases/phases.module'
import { WALLET_ACTION_TYPES } from '@/store/modules/wallet/wallet.module'

const engineMixins = {
  watch: {
    '$store.state.wallet.isInjected': {
      async handler (val) {
        console.log('is Injected', val)
        await this.getDataFromEngine()
      }
    }
  },
  async mounted () {
    await this.init()
  },
  methods: {
    ...mapActions(MODULE_NAMES.WALLET, {
      initWeb3Engine: WALLET_ACTION_TYPES.INIT_WEB_3_ENGINE
    }),
    ...mapActions(MODULE_NAMES.PHASES, {
      getDataFromEngine: PHASES_ACTION_TYPES.GET_DATA_FROM_ENGINE
    }),
    async init () {
      if (process.env.VUE_APP_DATA_SOURCE === 'register') {
        await Promise.all([
          await this.initWeb3Engine(),
          await this.getDataFromEngine()
        ])
      }
    }
  }
}

export default engineMixins
