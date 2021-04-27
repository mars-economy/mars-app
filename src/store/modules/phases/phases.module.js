import { apolloProvider } from '@/plugins/apollo/apollo'

const getAllDataQuery = require('../../../plugins/apollo/query/getAllDataQuery.gql')

const state = {
  categories: {},
  milestones: {},
  predictions: {},
  outcomes: {}
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
  async [PHASES_ACTION_TYPES.GET_DATA] ({ commit }) {
    try {
      await apolloProvider.defaultClient.query({ query: getAllDataQuery }).then(res => {
        commit(PHASES_MUTATION_TYPES.SET_STATE, {
          categories: res.data.categories,
          milestones: res.data.milestones,
          predictions: res.data.predictions,
          outcomes: res.data.outcomes
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
