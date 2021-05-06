import { apolloProvider } from '@/plugins/apollo/apollo'
import { PhasesTree } from '@/utils/tree.structure'

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
  GET_DATA: 'getData'
}

export const PHASES_MUTATION_TYPES = {
  SET_STATE: 'setState'
}

const actions = {
  async [PHASES_ACTION_TYPES.GET_DATA] ({
    commit,
    rootState,
    dispatch
  }) {
    try {
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
