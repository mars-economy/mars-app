import { getInstance } from '@snapshot-labs/lock/plugins/vue3'
import { Web3Provider } from '@ethersproject/providers'

let auth

export const WALLET_ACTION_TYPES = {
  WALLET_LOGIN: 'walletLogin',
  WALLET_LOGOUT: 'walletLogout',
  INIT_WALLET: 'initWallet',
  LOAD_PROVIDER: 'loadProvider'
}

export const state = {
  isInjected: false,
  web3: null,
  provider: null
}
export const getters = {}
export const actions = {
  async [WALLET_ACTION_TYPES.INIT_WALLET] ({ dispatch }) {
    const auth = getInstance()
    auth.getConnector().then(connector => {
      console.log('connector', connector)
      if (connector) dispatch(WALLET_ACTION_TYPES.WALLET_LOGIN, connector)
    })
  },
  async [WALLET_ACTION_TYPES.WALLET_LOGIN] ({
    state,
    dispatch
  }, connector = 'injected') {
    auth = getInstance()
    await auth.login(connector)
    if (auth.provider.value) {
      auth.web3 = new Web3Provider(auth.provider.value)
      await dispatch(WALLET_ACTION_TYPES.LOAD_PROVIDER)
    }
    console.log(state, connector)
  },
  async [WALLET_ACTION_TYPES.LOAD_PROVIDER] ({
    state,
    dispatch
  }) {
    try {
      if (
        auth.provider.value.removeAllListeners
      ) {
        auth.provider.value.removeAllListeners()
      }
      if (auth.provider.value.on) {
        auth.provider.value.on('chainChanged', async chainId => {
          console.log('HANDLE_CHAIN_CHANGED', chainId)
          await dispatch(WALLET_ACTION_TYPES.LOAD_PROVIDER)
        })
        auth.provider.value.on('accountsChanged', async accounts => {
          if (accounts.length !== 0) {
            console.log('WEB3_SET', { account: accounts[0] })
            await dispatch(WALLET_ACTION_TYPES.LOAD_PROVIDER)
          }
        })
        let network, accounts
        try {
          [network, accounts] = await Promise.all([
            auth.web3.getNetwork(),
            auth.web3.listAccounts()
          ])
        } catch (e) {
          console.log(e)
        }
        console.log('network, accounts', network, accounts)
        // auth.provider.on('disconnect', async () => {});
      }
    } catch (e) {
      return Promise.reject(e)
    }
    console.log(state)
  },
  async [WALLET_ACTION_TYPES.WALLET_LOGOUT] ({ dispatch }) {
    await auth.logout()
  }
}
export const mutations = {}

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
}
