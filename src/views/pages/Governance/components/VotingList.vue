<template>
  <div v-if="type === 'current'" class="p-mt-3">

    <template v-for="item in getPendingVotingList()" :key="item.id">
      <VotingCard :outcome="item" class="p-mb-3" pending :is-mobile="isMobile"/>
    </template>

    <template v-for="item in getCurrentVotingList()" :key="item.id">
      <VotingCard :outcome="item" class="p-mb-3" :is-mobile="isMobile"/>
    </template>

  </div>
  <div v-if="type === 'historical'" class="p-mt-3">
  </div>
</template>

<script>
import VotingCard from '@/views/pages/Governance/components/voting/VotingCard'
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
      pendingVotingList: [
        {
          id: 123,
          name: 'Will NASA announce the crew members destined for the first Mars Mission by June 2023?',
          state: 'SettlementWithConsensus',
          endDate: 1687392000
        },
        {
          id: 125,
          name: 'Will NASA announce the crew members destined for the first Mars Mission by June 2023?',
          state: 'SettlementWithoutConsensus',
          endDate: 1687392000
        }
      ],
      currentVotingList: [
        {
          id: 223,
          name: 'Will NASA announce the crew members destined for the first Mars Mission by June 2023?',
          consensusReached: false,
          endDate: 1687392000,
          voted: [
            { outcome: 'agree', percentage: 0, voted: false, isWinningOutcome: false },
            { outcome: 'disagree', percentage: 0, voted: false, isWinningOutcome: false },
            { outcome: 'other variant', percentage: 0, voted: false, isWinningOutcome: false }
          ]
        },
        {
          id: 225,
          name: 'Will NASA announce the crew members destined for the first Mars Mission by June 2023?',
          consensusReached: true,
          endDate: 1687392000,
          voted: [
            { outcome: 'agree', percentage: 0, voted: false, isWinningOutcome: false },
            { outcome: 'disagree', percentage: 100, voted: true, isWinningOutcome: false },
            { outcome: 'other variant', percentage: 0, voted: false, isWinningOutcome: false }
          ]
        }
      ]
    }
  },
  methods: {
    getPendingVotingList () {
      return this.pendingVotingList
    },
    getCurrentVotingList () {
      return this.currentVotingList
    }
  }
}
</script>

<style scoped>

</style>
