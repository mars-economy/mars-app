import { VotingObject } from '@/utils/voting.structure'
import VOTING_LIST from '@/constants/votingObjects.json'

const state = {
  votings: []
}
const getters = {
  getFilteredVotingList: state => (searchParam, searchString) => {
    return state.votings.filter(item => item[searchParam].toLowerCase() === searchString.toLowerCase())
  }
}

export const GOVERNANCE_ACTION_TYPES = {
  GET_VOTING_LIST: 'getVotingList',
  GET_OUTCOME_STATUS: 'getOutcomeStatus'
}

export const GOVERNANCE_MUTATION_TYPES = {
  SET_STATE: 'setState',
  ADD_VOTE: 'addVote'
}

const actions = {
  async [GOVERNANCE_ACTION_TYPES.GET_VOTING_LIST] ({
    commit,
    dispatch,
    rootState
  }) {
    // TODO await GET and filter Predictions #need rootState.phases.predictions exists
    const dataP = new VotingObject(VOTING_LIST[0], 'pending')
    commit(GOVERNANCE_MUTATION_TYPES.ADD_VOTE, dataP)
    // TODO await GET MarsGovernance.getOutcomeStatus(false)
    const dataC = new VotingObject(VOTING_LIST[1], 'current')
    commit(GOVERNANCE_MUTATION_TYPES.ADD_VOTE, dataC)
    const dataC2 = new VotingObject(VOTING_LIST[2], 'current')
    commit(GOVERNANCE_MUTATION_TYPES.ADD_VOTE, dataC2)
    // TODO await GET MarsGovernance.getOutcomeStatus(true)
    const dataH = new VotingObject(VOTING_LIST[3], 'historical')
    commit(GOVERNANCE_MUTATION_TYPES.ADD_VOTE, dataH)
  },
  async [GOVERNANCE_ACTION_TYPES.GET_OUTCOME_STATUS] ({ commit }, state = 'Current') {
    // TODO MAKE CONTRACT REQUEST
  }
}
const mutations = {
  [GOVERNANCE_MUTATION_TYPES.SET_STATE] (_state, payload) {
    Object.keys(payload).forEach(key => {
      _state[key] = payload[key]
    })
  },
  [GOVERNANCE_MUTATION_TYPES.ADD_VOTE] (_state, payload) {
    if (payload instanceof Array) {
      payload.forEach(item => {
        _state.votings.push(item)
      })
    } else {
      _state.votings.push(payload)
    }
  }
}

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
}
