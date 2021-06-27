<template>
  <div class="p-d-flex p-flex-column p-ai-stretch" :class="{'mobile' : isMobile}">
    <Heading v-if="!isMobile" class="p-my-3" level="1" name="Voting Page"/>
    <div class="headline" v-else>
      Governance
    </div>
    <div class="p-grid p-ai-end p-mt-1 p-my-3">
      <div class="p-col">
        <PreviousPageLink text="Go to the list of votings" />
      </div>
      <div class="text-smallest muted p-col p-text-right" v-if="!isMobile">
        There is a Governance Voting for the prediction.<br>
        If you are a $DMT Holder, you can vote for the correct answer.
      </div>
    </div>
    <StakePanel :is-mobile="isMobile" class="p-order-1 p-order-sm-0"/>

    <VotingCard :prediction="getPrediction()" :is-mobile="isMobile" class="p-mt-sm-3 p-mb-3" />

  </div>
</template>

<script>

import StakePanel from '@/views/pages/Governance/components/stake/StakePanel'
import votingObjects from '@/constants/votingObjects.json'
import VotingCard from './components/voting/VotingCard'
export default {
  name: 'Voting',
  components: {
    VotingCard,
    StakePanel
  },
  props: {
    isMobile: Boolean
  },
  data: function () {
    return {
      votingUuid: null
    }
  },
  watch: {
    $route: {
      handler: async function (route) {
        if (route.params.id) {
          this.votingUuid = route.params.id
        }
      },
      immediate: true
    }
  },
  methods: {
    getPrediction () {
      return votingObjects.find(object => object.votingUuid === this.votingUuid)
    }
  }
}
</script>

<style scoped>

</style>
