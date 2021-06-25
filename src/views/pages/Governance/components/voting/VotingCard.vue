<template>
  <div class="voting-card card" :class="{'mobile' : isMobile}">
    <CardLabel label-pos="left" color="light" :label="prediction.step" />
    <CardLabel label-pos="right" color="primary" label="pending" v-if="prediction.state === 'pending'" />

    <div class="card-header p-mb-sm-3 p-d-flex p-ai-center p-jc-between">
      <div class="h3">
        {{prediction.name}}
      </div>
      <div v-if="isMobile">
        <Button  label=' ' class="btn-text" icon="pi pi-angle-right" iconPos="right" />
      </div>
    </div>

    <template v-if="!isMobile">
      <div class="card-accent-line p-d-flex p-jc-between p-ai-center p-py-3">
        <TextPair :data="prepareDate(prediction.date)"
                  icon="date"
                  :label="prediction.state === 'pending' ? 'due date' : 'voting end date'"
                  class="p-mr-4"/>
        <template v-if="prediction.state === 'historical'">
          <TextPair :data="prediction.OutcomeVoting?.totalSupply"
                    icon="coins"
                    label="$DMT voted"
                    class="p-mr-4"/>
          <TextPair :data="getQuorumData()"
                    icon="users"
                    label="quorum"
                    class="p-mr-4"/>
        </template>
        <div class="links p-ml-auto">
        <span class="text-link p-mr-3">
          Go to the voting page
        </span>
          <span class="text-link">
          Go to the prediction page
        </span>
        </div>
      </div>
      <div class="card-body p-mt-3">

        <template v-if="prediction.state === 'pending' ">
          <Button :label="getButtonLabel()" class="btn-primary" v-if="getButtonLabel()"/>
        </template>

        <template  v-if="prediction.state === 'current'">
          <VotingChoicePanel :outcomes="getVotingChoiceVariant()" />
        </template>

        <template  v-if="prediction.state === 'historical'">
          <VotingResultPanel :outcomes="getVotingChoiceVariant()" />
        </template>

      </div>
    </template>

  </div>

</template>

<script>
import { getFormattedData } from '@/helpers/date.helper'
import VotingChoicePanel from '@/views/pages/Governance/components/voting/VotingChoicePanel'
import VotingResultPanel from '@/views/pages/Governance/components/voting/VotingResultPanel'

export default {
  name: 'VotingCard',
  components: {
    VotingResultPanel,
    VotingChoicePanel
  },
  props: {
    prediction: Object,
    isMobile: Boolean
  },
  data: function () {
    return {
      user: { role: 'Qualified DMT Holder' }
    }
  },
  methods: {
    prepareDate (timeS) {
      return getFormattedData(timeS)
    },
    getButtonLabel () {
      if (this.prediction.step === 'no consensus') {
        return 'start voting'
      }
      if (this.prediction.step === 'consensus' && this.user.role === 'Qualified DMT Holder') {
        return 'start dispute'
      } else {
        return null
      }
    },
    getVotingChoiceVariant () {
      return this.prediction.OutcomeStatus?.voted.map((outcome, i) => {
        outcome['name'] = this.prediction.OutcomeStatus.outcomes[i].name
        return outcome
      })
    },
    getQuorumData () {
      let data = this.prediction.OutcomeStatus?.quorumReached ? 'Yes' : 'No'
      data += ' (' + this.prediction.OutcomeStatus?.quorumPercentage + '%)'
      return data
    }
  }
}
</script>

<style scoped lang="scss">
  .voting-card {
    padding-top: 42px;
    padding-bottom: 24px;
  }

</style>
