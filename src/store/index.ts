// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createStore } from 'vuex'
import wallet from '@/store/modules/wallet/wallet.module'
import phases from '@/store/modules/phases/phases.module'
import contracts from '@/store/modules/contracts/contracts.module'
import governance from '@/store/modules/governance/governance.module'

export const MODULE_NAMES = {
  WALLET: 'wallet',
  PHASES: 'phases',
  CONTRACTS: 'contracts',
  GOVERNANCE: 'governance'
}

export default createStore({
  modules: {
    [MODULE_NAMES.WALLET]: wallet,
    [MODULE_NAMES.PHASES]: phases,
    [MODULE_NAMES.CONTRACTS]: contracts,
    [MODULE_NAMES.GOVERNANCE]: governance
  }
})
