import erc20 from '@/data/abi/erc20.json'
import MarsPredictionMarket from '@/data/MarsPredictionMarket.json'
import { _toBN, checkAllowance } from '@/utils/contract'
import BigNumber from 'bignumber.js'
import { mathRound } from '@/utils/math.ts'

const state = {}
const getters = {}

export const CONTRACTS_ACTION_TYPES = {
  BUY_OUTCOME: 'buyOutcome',
  GET_USER_STAKES: 'getUserStakes',
  GET_REWARDS: 'getRewards',
  GET_SHARE_PRICE: 'getSharePrice',
  GET_PREDICTION_META: 'getPredictionMeta'
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
    try {
      const [WALLET, PREDICTION_MARKET_ADDR] = [
        rootState.wallet.account,
        data.prediction.id
      ]
      const predictionMarketContract = await new rootState.wallet.web3.eth.Contract(MarsPredictionMarket.abi, PREDICTION_MARKET_ADDR)
      const timestampS = Math.floor(Date.now() / 1000)
      const states = await predictionMarketContract.methods.getUserPredictionState(WALLET, timestampS).call()
      return states
    } catch (e) {
      console.debug(e)
      return Promise.reject(e)
    }
  },
  async [CONTRACTS_ACTION_TYPES.GET_PREDICTION_META] ({ rootState }, data) {
    try {
      const [WALLET, PREDICTION_MARKET_ADDR] = [
        rootState.wallet.account,
        data.prediction.id
      ]
      const predictionMarketContract = await new rootState.wallet.web3engine.eth.Contract(MarsPredictionMarket.abi, PREDICTION_MARKET_ADDR)

      const [startSharePrice, endSharePrice, predictionTimeStart, predictionTimeEnd] = await Promise.all([
        await predictionMarketContract.methods.startSharePrice().call(),
        await predictionMarketContract.methods.endSharePrice().call(),
        await predictionMarketContract.methods.predictionTimeStart().call(),
        await predictionMarketContract.methods.predictionTimeEnd().call()
      ])

      return {
        startSharePrice: new BigNumber(startSharePrice).dividedBy(1000000).valueOf(),
        endSharePrice: new BigNumber(endSharePrice).dividedBy(1000000).valueOf(),
        predictionTimeStart: +predictionTimeStart,
        predictionTimeEnd: +predictionTimeEnd
      }
    } catch (e) {
      console.debug(e)
      return Promise.reject(e)
    }
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
  },
  async [CONTRACTS_ACTION_TYPES.GET_SHARE_PRICE] ({ rootState }, data) {
    console.debug('getUserStakes INIT')
    try {
      const [WALLET, PREDICTION_MARKET_ADDR] = [
        rootState.wallet.account,
        data.prediction.id
      ]
      const predictionMarketContract = await new rootState.wallet.web3engine.eth.Contract(MarsPredictionMarket.abi, PREDICTION_MARKET_ADDR)
      const timestampS = Math.floor(Date.now() / 1000)
      const price = await predictionMarketContract.methods.getSharePrice(timestampS).call()
      const predictionPrice = mathRound(new BigNumber(price).dividedBy(1000000).valueOf(), 6)
      return Promise.resolve(predictionPrice)
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
