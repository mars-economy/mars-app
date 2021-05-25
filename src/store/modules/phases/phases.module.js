import { apolloProvider } from '@/plugins/apollo/apollo'
import { PhasesTree } from '@/utils/tree.structure'
import MarsRegister from '@/data/MarsRegister.json'
import BigNumber from 'bignumber.js'
import {
  createCategoriesArray,
  createMilestonesArray,
  createOutcomesArray,
  createPredictionsArray
} from '@/helpers/phases.objects'

const getAllDataQuery = require('../../../plugins/apollo/query/getAllDataQuery.gql')

const state = {
  categories: {},
  milestones: {},
  predictions: {},
  outcomes: {},
  phases: {}
}

const getters = {
  getPhases: state => (phaseName, parentId) => {
    return state[phaseName]
  }
}

export const PHASES_ACTION_TYPES = {
  GET_DATA: 'getData',
  GET_DATA_FROM_ENGINE: 'getDataFromEngine'
}

export const PHASES_MUTATION_TYPES = {
  SET_STATE: 'setState'
}

const actions = {
  async [PHASES_ACTION_TYPES.GET_DATA_FROM_ENGINE] ({
    commit,
    rootState
  }) {
    // try {
    console.log('register')
    const registerContract = await new rootState.wallet.web3engine.eth.Contract(MarsRegister.abi, process.env.VUE_APP_REGISTER_ADDR)
    const timestampS = new BigNumber(Math.floor(Date.now() / 1000))
    console.log(Math.floor(Date.now() / 1000), timestampS.valueOf())
    await registerContract.methods.getPredictionData(timestampS).call()
      .then(res => {
        if (res) {
          console.log(res)
          const categories = createCategoriesArray(res[0])
          const milestones = createMilestonesArray(res[1], categories)
          const predictions = createPredictionsArray(res[2], milestones)
          const outcomes = createOutcomesArray(res[3], predictions)

          const sortedData = {
            categories: categories,
            milestones: milestones,
            predictions: predictions,
            outcomes: outcomes
          }
          console.log(sortedData)
          const phases = new PhasesTree(sortedData)
          console.log(phases)
          phases.nodes.forEach(async item => {
            if (item.nodeType === 'predictions') {
              if (!rootState.wallet.isInjected) return
              return item
            }
          })
          commit(PHASES_MUTATION_TYPES.SET_STATE, {
            categories: categories,
            milestones: milestones,
            predictions: predictions,
            outcomes: outcomes,
            phases: phases
          })
        }
        return res
      })
    console.log(state.phases)
    // } catch (e) {
    //   console.debug(e)
    // }
  },
  async [PHASES_ACTION_TYPES.GET_DATA] ({
    commit,
    rootState,
    dispatch
  }) {
    try {
      console.log('apollo')
      await apolloProvider.defaultClient.query({
        query: getAllDataQuery,
        fetchPolicy: 'no-cache'
      }).then(res => {
        const sortedData = {
          categories: res.data.categories,
          milestones: res.data.milestones,
          predictions: res.data.predictions,
          outcomes: res.data.outcomes
        }
        const phases = new PhasesTree(sortedData)
        phases.nodes.forEach(async item => {
          if (item.nodeType === 'predictions') {
            if (!rootState.wallet.isInjected) return
            // const stakes = await dispatch(MODULE_NAMES.CONTRACTS + '/' + CONTRACTS_ACTION_TYPES.GET_USER_STAKES, { prediction: item }, { root: true }) || null
            // console.log('item.totalStakeAmount.valueOf()', item.totalStakeAmount.valueOf())
            // item.stakes = stakes
            return item
          }
        })
        commit(PHASES_MUTATION_TYPES.SET_STATE, {
          categories: res.data.categories,
          milestones: res.data.milestones,
          predictions: res.data.predictions,
          outcomes: res.data.outcomes,
          phases: phases
        })
      })
    } catch (e) {
      console.debug(e)
    }
  }
}
const mutations = {
  [PHASES_MUTATION_TYPES.SET_STATE] (_state, payload) {
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
