<template>
  <div class="voting-card card">
    <CardLabel label-pos="left" color="light" :label="outcome.consensusReached ? 'consensus' : 'no consensus'" />
    <CardLabel label-pos="right" color="primary" label="pending" v-if="pending" />

    <div class="card-header h3 p-mb-3">
      Will NASA announce the crew members destined for the first Mars Mission by June 2023?
    </div>

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
        <Button :label="getButtonLabel()" class="btn-primary" />
      </template>

      <div class="p-d-flex">
        <div v-for="voted of outcome.voted" :key="voted" class="p-field-radiobutton p-mt-3">
          <RadioButton :id="voted" name="category" :value="voted" v-model="selectedVoted" disabled />
          <label :for="voted">{{voted}}</label>
        </div>
        <div class="p-mt-3 p-ml-3">
          <Button label="vote" class="btn-primary" :disabled="!selectedVoted"/>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
import { getFormattedData } from '@/helpers/date.helper'
import RadioButton from 'primevue/radiobutton'

export default {
  name: 'VotingCard',
  components: {
    RadioButton
  },
  props: {
    outcome: Object,
    historical: { type: Boolean, default: false },
    pending: { type: Boolean, default: false }
  },
  data: function () {
    return {
      selectedVoted: null
    }
  },
  methods: {
    prepareDate (timeS) {
      return getFormattedData(timeS)
    },
    getButtonLabel () {
      return this.outcome.consensusReached ? 'start disput' : 'start voting'
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
