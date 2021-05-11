<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="prediction-name p-d-flex p-ai-start p-ai-md-center p-mb-3">
        <NumberCircle :number="prediction.position" class="p-mr-2"></NumberCircle>
        <span class="text-body p-ml-1">{{ prediction.name }}</span>
      </div>
    </div>
      <template v-for="(outcome, index) in prediction.getChildrenList()" :key="index">
        <div class="p-col-12 p-md-6">
            <PredictionOutcome :outcome="outcome" :isMobile="isMobile"/>
        </div>
      </template>

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
    prediction: Object,
    isMobile: Boolean
  }
}
</script>

<style scoped lang="scss">

  .prediction-name {
    @extend %card-bg;
    border: $border-light;
    padding: 20px 24px;
  }

</style>
