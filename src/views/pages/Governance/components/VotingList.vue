<template>
  <div class="p-mt-3">

    <template v-for="item in getVotingList()" :key="item.id">
      <VotingCard :prediction="item" class="p-mb-3" pending :is-mobile="isMobile"/>
    </template>

  </div>
</template>

<script>
import VotingCard from '@/views/pages/Governance/components/voting/VotingCard'
import votingObjects from '@/constants/votingObjects.json'
export default {
  name: 'VotingList',
  components: {
    VotingCard
  },
  props: {
    type: String,
    isMobile: Boolean
  },
  methods: {
    getVotingList () {
      return votingObjects
    }
  }
}
</script>

<style scoped>

</style>
