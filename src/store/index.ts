import { createStore } from 'vuex'
import wallet from '@/store/modules/wallet/wallet.module'
import phases from '@/store/modules/phases/phases.module'

export const MODULE_NAMES = {
  WALLET: 'wallet',
  PHASES: 'phases'
}

export default createStore({
  modules: {
    [MODULE_NAMES.WALLET]: wallet,
    [MODULE_NAMES.PHASES]: phases
  }
})
