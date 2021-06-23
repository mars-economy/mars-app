<template>
  <div class="voting-card card" :class="{'mobile' : isMobile}">
    <CardLabel label-pos="left" color="light" :label="getLabelText()" />
    <CardLabel label-pos="right" color="primary" label="pending" v-if="pending" />

    <div class="card-header p-mb-sm-3 p-d-flex p-ai-center p-jc-between">
      <div class="h3">
        Will NASA announce the crew members destined for the first Mars Mission by June 2023?
      </div>
      <div v-if="isMobile">
        <Button  label=' ' class="btn-text" icon="pi pi-angle-right" iconPos="right" />
      </div>

      </div>

    <template v-if="!isMobile">
      <div class="card-accent-line p-d-flex p-jc-between p-ai-center p-py-3">
        <TextPair :data="prepareDate(outcome.endDate)" icon="date" label="due date" class="p-mr-4"/>
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

        <template v-if="pending">
          <Button :label="getButtonLabel()" class="btn-primary" v-if="getButtonLabel()"/>
        </template>

        <template  v-if="!pending && !historical">
          <VotingChoicePanel :outcomes="getVotingChoiceVariant()" />
        </template>

      </div>
    </template>

  </div>

</template>

<script>
import { getFormattedData } from '@/helpers/date.helper'
import VotingChoicePanel from '@/views/pages/Governance/components/voting/VotingChoicePanel'

export default {
  name: 'VotingCard',
  components: {
    VotingChoicePanel
  },
  props: {
    outcome: Object,
    historical: { type: Boolean, default: false },
    pending: { type: Boolean, default: false },
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
    getLabelText () {
      if (this.pending && this.outcome.state === 'SettlementWithConsensus') {
        return 'consensus'
      }
      if ((this.pending && this.outcome.state === 'SettlementWithoutConsensus') || (!this.pending && !this.outcome.consensusReached)) {
        return 'no consensus'
      }
      if (!this.pending && this.outcome.consensusReached) {
        return 'dispute'
      }
    },
    getButtonLabel () {
      if (this.outcome.state === 'SettlementWithoutConsensus') {
        return 'start voting'
      }
      if (this.outcome.state === 'SettlementWithConsensus' && this.user.role === 'Qualified DMT Holder') {
        return 'start dispute'
      } else {
        return null
      }
    },
    getVotingChoiceVariant () {
      return this.outcome.voted
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
