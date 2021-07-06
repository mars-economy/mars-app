<template>
  <div class="p-mt-3">
    <template v-if="votingList.length !== 0">
      <template v-for="item in votingList" :key="item.id">
        <VotingCard :is-mobile="isMobile" :prediction="item" class="p-mb-3"/>
      </template>
    </template>
    <div class="p-mt-4 p-text-center" v-else>
      <Loader large />
    </div>

  </div>
</template>

<script>
import VotingCard from '@/views/pages/Governance/components/voting/VotingCard'
import { mapActions, mapGetters } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { GOVERNANCE_ACTION_TYPES } from '@/store/modules/governance/governance.module'

export default {
  name: 'VotingList',
  components: {
    VotingCard
  },
  props: {
    type: String,
    isMobile: Boolean
  },
  data: function () {
    return {
      votingList: []
    }
  },
  watch: {
    type: {
      async handler (val) {
        this.getVotes(val)
      }
    }
  },
  async mounted () {
    await this.getVoteList()
    this.getVotes(this.type)
  },
  methods: {
    getVotes (state) {
      this.votingList = []
      if (state.toLowerCase() === 'current') {
        this.getFilteredVotingList('state', 'pending').forEach(item => this.votingList.push(item))
        this.getFilteredVotingList('state', 'current').forEach(item => this.votingList.push(item))
      }
      if (state.toLowerCase() === 'historical') {
        this.getFilteredVotingList('state', 'historical').forEach(item => this.votingList.push(item))
      }
    },
    ...mapActions(MODULE_NAMES.GOVERNANCE, {
      getVoteList: GOVERNANCE_ACTION_TYPES.GET_VOTING_LIST
    })
  },
  computed: {
    ...mapGetters(MODULE_NAMES.GOVERNANCE, ['getFilteredVotingList'])
  }
}
</script>

<style scoped>

</style>
