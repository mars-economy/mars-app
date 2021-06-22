<template>
  <div>
    <VotingCard :outcome="outcomeStatus"  />
  </div>

</template>

<script>
import VotingCard from '@/views/pages/Governance/components/voting/VotingCard'
export default {
  name: 'VotingList',
  components: {
    VotingCard
  },
  data: function () {
    return {
      outcomeStatus: {
        consensusReached: false,
        market: '',
        endDate: 1687392000,
        decision: 0,
        totalSupply: 0,
        quorumPercentage: 88,
        voted: [1, 2, 3]
      }
    }
  }
}
</script>

<style scoped>

</style>
