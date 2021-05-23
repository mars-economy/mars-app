<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="prediction-title p-d-flex p-flex-column" :class="{'mobile' : isMobile}">
        <div class="p-d-flex p-ai-start p-ai-md-center">
          <NumberCircle :number="prediction.position" class="p-mr-2"></NumberCircle>
          <span class="text-body p-text-bold p-ml-1">{{ prediction.name }}</span>
        </div>
        <div class="prediction-info p-d-flex p-ai-start p-ai-md-center p-mt-3" v-if="!isMobile">
          <TextPair label="today share price" data="120" unit="BUSD" icon="price" class="p-mr-3"/>
          <TextPair label="state" :data="prediction.state" icon="state" />
        </div>
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

  .prediction-title {
    @extend %card-bg;
    border: $border-light;
    padding: 20px 24px;
    &.mobile {
      padding: $card-padding-mobile-h
    }
  }
</style>
