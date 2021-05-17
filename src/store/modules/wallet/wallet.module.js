import { getInstance } from '@snapshot-labs/lock/plugins/vue3'
import connectors from '@/helpers/connectors.json'
import networks from '@/helpers/networks.json'
import Web3 from 'web3'
import erc20 from '@/data/abi/erc20.json'

let auth

export const WALLET_ACTION_TYPES = {
  WALLET_LOGIN: 'walletLogin',
  WALLET_LOGOUT: 'walletLogout',
  INIT_WALLET: 'initWallet',
  LOAD_PROVIDER: 'loadProvider',
  GET_WALLET_BALANCES: 'getWalletBalances'
}

export const WALLET_MUTATION_TYPES = {
  SET_STATE: 'setState'
}

export const state = {
  isInjected: false,
  web3: null,
  network: null,
  account: null,
  connector: null,
  balance: null,
  balanceBUSD: null
}
export const getters = {
  getWalletShortName: state => {
    if (state.account) {
      const f = (str, n) => (str.length > n) ? str.substr(0, n - 1) + '...' : str
      return f(state.account, 10)
    }
    return null
  },
  getWalletData: (state, getters) => {
    if (!state.account) return null
    const name = networks[state.network].shortName ? networks[state.network].shortName : networks[state.network].name
    return {
      walletName: getters.getWalletShortName,
      connectorIcon: state.connector ? state.connector.icon : null,
      connectorName: state.connector ? name : null
    }
  },
  getWalletBalance: state => {
    return state.balance
  }
}
export const actions = {
  async [WALLET_ACTION_TYPES.INIT_WALLET] ({ dispatch }) {
    const auth = getInstance()
    auth.getConnector().then(connector => {
      if (connector) dispatch(WALLET_ACTION_TYPES.WALLET_LOGIN, connector)
    })
  },
  async [WALLET_ACTION_TYPES.WALLET_LOGIN] ({
    commit,
    dispatch
  }, connector = 'injected') {
    auth = getInstance()
    await auth.login(connector)
    console.log(auth.provider)
    if (auth.provider.value) {
      // auth.web3 = new Web3Provider(auth.provider.value)
      auth.web3 = new Web3(auth.provider.value)
      commit(WALLET_MUTATION_TYPES.SET_STATE, {
        connector: connectors[connector]
      })
      await dispatch(WALLET_ACTION_TYPES.LOAD_PROVIDER)
    }
  },
  async [WALLET_ACTION_TYPES.LOAD_PROVIDER] ({
    commit,
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
          // await dispatch(WALLET_ACTION_TYPES.LOAD_PROVIDER)
          window.location.reload()
        })
        auth.provider.value.on('accountsChanged', async accounts => {
          if (accounts.length !== 0) {
            console.log('WEB3_SET', { account: accounts[0] })
            // await dispatch(WALLET_ACTION_TYPES.LOAD_PROVIDER)
            window.location.reload()
          }
        })
        let network, accounts
        try {
          [network, accounts] = await Promise.all([
            auth.web3.eth.net.getId(),
            auth.web3.eth.getAccounts()
          ])
          const balance = await auth.web3.eth.getBalance(accounts[0], 'latest')
          commit(WALLET_MUTATION_TYPES.SET_STATE, {
            isInjected: true,
            web3: auth.web3,
            network: network,
            account: accounts[0],
            balance: balance
          })
        } catch (e) {
          console.debug(e)
        }
      }
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async [WALLET_ACTION_TYPES.WALLET_LOGOUT] ({ commit }) {
    try {
      await auth.logout()
      commit(WALLET_MUTATION_TYPES.SET_STATE, {
        isInjected: false,
        web3: null,
        network: null,
        account: null
      })
      window.location.reload()
    } catch (e) {
      console.debug(e)
    }
  },
  async [WALLET_ACTION_TYPES.GET_WALLET_BALANCES] ({
    commit,
    state
  }, data) {
    try {
      const tokenContract = await new state.web3.eth.Contract(erc20, data)
      await tokenContract.methods.balanceOf(state.account).call()
        .then(async function (bal) {
          commit(WALLET_MUTATION_TYPES.SET_STATE, { balanceBUSD: bal })
        })
        // eslint-disable-next-line no-unused-vars
        .catch(e => {
          console.debug(e)
        })
    } catch (e) {
      console.debug(e)
    }
  }
}
export const mutations = {
  [WALLET_MUTATION_TYPES.SET_STATE] (_state, payload) {
    Object.keys(payload).forEach(key => {
      _state[key] = payload[key]
    })
  }
}

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
}
