<template>
  <div>
    <div class="prediction-name p-d-flex p-ai-center p-mb-4">
      <NumberCircle :number="prediction.position" class="p-mr-2"></NumberCircle>
      <span class="text-body p-ml-1">{{ prediction.name }}</span>
    </div>
    <div class="p-d-flex p-jc-between p-flex-wrap p-ai-start">
      <template v-for="(outcome, index) in outcomes" :key="index">
        <PredictionOutcome :outcome="outcome"/>
      </template>
    </div>

  </div>

</template>

<script>
import PredictionOutcome from '@/views/pages/Milestone/components/PredictionOutcome'

export default {
  name: 'Prediction',
  components: {
    PredictionOutcome
  },
  props: {
    prediction: Object
  },
  computed: {
    outcomes () {
      if (Object.keys(this.prediction) === 0) {
        return []
      }
      return Array.from(this.$store.state.phases.outcomes).filter(item => this.prediction.id === item.prediction.id)
    }
  }
}
</script>

<style scoped lang="scss">

  .prediction-name {
    @extend %card-bg;
    border: $border-light;
    padding: 20px 24px;
  }

  .outcome.card {
    margin-bottom: 2rem;
  }

</style>
