import { createStore } from 'vuex'
import wallet from '@/store/modules/wallet/wallet.module'

export const MODULE_NAMES = {
  WALLET: 'wallet'
}

export default createStore({
  modules: {
    [MODULE_NAMES.WALLET]: wallet
  }
})
