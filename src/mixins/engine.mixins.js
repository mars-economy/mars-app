import { mapActions } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { PHASES_ACTION_TYPES } from '@/store/modules/phases/phases.module'
import { WALLET_ACTION_TYPES } from '@/store/modules/wallet/wallet.module'

const engineMixins = {
  async mounted () {
    if (process.env.VUE_APP_DATA_SOURCE === 'register') {
      await Promise.all([
        await this.initEngine(),
        await this.getDataFromEngine()
      ])
    }
  },
  methods: {
    ...mapActions(MODULE_NAMES.WALLET, {
      initEngine: WALLET_ACTION_TYPES.INIT_WEB_3_ENGINE
    }),
    ...mapActions(MODULE_NAMES.PHASES, {
      getDataFromEngine: PHASES_ACTION_TYPES.GET_DATA_FROM_ENGINE
    })
  }
}

export default engineMixins
