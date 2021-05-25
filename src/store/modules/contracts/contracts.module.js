import erc20 from '@/data/abi/erc20.json'
import MarsPredictionMarket from '@/data/PredictionMarket.json'
import { _toBN, checkAllowance } from '@/utils/contract'

const state = {}
const getters = {}

export const CONTRACTS_ACTION_TYPES = {
  BUY_OUTCOME: 'buyOutcome',
  GET_USER_STAKES: 'getUserStakes',
  GET_REWARDS: 'getRewards'
}

export const CONTRACTS_MUTATION_TYPES = {
  SET_STATE: 'setState'
}

const actions = {
  async [CONTRACTS_ACTION_TYPES.BUY_OUTCOME] ({ rootState }, data) {
    try {
      const [WALLET, PREDICTION_MARKET_ADDR, TOKEN_ADDRESS_FROM, OUTCOME_UUID] = [
        rootState.wallet.account,
        data.prediction.id,
        data.prediction.token,
        data.outcome.id
      ]

      const tokenContractFrom = await new rootState.wallet.web3.eth.Contract(erc20, TOKEN_ADDRESS_FROM)
      const tokenDecimals = await tokenContractFrom.methods.decimals().call()
      const amount = _toBN(data.stake, tokenDecimals).toFixed()

      const rs = await checkAllowance(tokenContractFrom, WALLET, PREDICTION_MARKET_ADDR, amount)
      if (rs) {
        await tokenContractFrom.methods.approve(PREDICTION_MARKET_ADDR, rs).send({ from: WALLET })
      }

      const predictionMarketContract = await new rootState.wallet.web3.eth.Contract(MarsPredictionMarket.abi, PREDICTION_MARKET_ADDR)
      await predictionMarketContract.methods.predict(OUTCOME_UUID, amount)
        .send({ from: WALLET })
        .then(tx => {
          Promise.resolve(tx)
        })
    } catch (e) {
      console.debug(e)
      return Promise.reject(e)
    }
  },
  async [CONTRACTS_ACTION_TYPES.GET_USER_STAKES] ({ rootState }, data) {
    console.log('getUserStakes INIT')
    // try {
    const [WALLET, PREDICTION_MARKET_ADDR] = [
      rootState.wallet.account,
      data.prediction.id
    ]
    const predictionMarketContract = await new rootState.wallet.web3engine.eth.Contract(MarsPredictionMarket.abi, PREDICTION_MARKET_ADDR)
    console.log('predictionMarketContract', predictionMarketContract)
    const states = await predictionMarketContract.methods.getUserPredictionState().call()
    console.log('getUserPredictionState', states)
    return states
    // } catch (e) {
    //   console.debug(e)
    //   return Promise.reject(e)
    // }
  },
  async [CONTRACTS_ACTION_TYPES.GET_REWARDS] ({ rootState }, data) {
    try {
      const [WALLET, PREDICTION_MARKET_ADDR, TOKEN_ADDRESS_FROM, OUTCOME_UUID] = [
        rootState.wallet.account,
        data.prediction.id,
        data.prediction.token,
        data.outcome.id
      ]
      const predictionMarketContract = await new rootState.wallet.web3.eth.Contract(MarsPredictionMarket.abi, PREDICTION_MARKET_ADDR)
      const tokenAddress = await predictionMarketContract.methods.tokenOutcomeAddress(data.outcome.id).call()
      const tokenContractFrom = await new rootState.wallet.web3.eth.Contract(erc20, tokenAddress)

      const tokenDecimals = await tokenContractFrom.methods.decimals().call()
      const amount = _toBN(data.reward.win, tokenDecimals).toFixed()

      const rs = await checkAllowance(tokenContractFrom, WALLET, PREDICTION_MARKET_ADDR, amount)
      if (rs) {
        await tokenContractFrom.methods.approve(PREDICTION_MARKET_ADDR, rs).send({ from: WALLET })
      }

      await predictionMarketContract.methods.getReward()
        .send({ from: WALLET })
        .then(tx => {
          Promise.resolve(tx)
        })
    } catch (e) {
      console.debug(e)
      return Promise.reject(e)
    }
  }
}
const mutations = {
  [CONTRACTS_MUTATION_TYPES.SET_STATE] (_state, payload) {
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
