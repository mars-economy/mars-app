<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="prediction-title p-d-flex p-flex-column" :class="{'mobile' : isMobile}">
        <div class="p-d-flex p-ai-start p-ai-md-center">
          <NumberCircle :number="prediction.position" class="p-mr-2"></NumberCircle>
          <span class="text-body p-text-bold p-ml-1">{{ prediction.name }}</span>
        </div>
        <div class="prediction-info p-d-flex p-ai-start p-ai-md-center p-mt-3" v-if="!isMobile">
          <TextPair :data="predictionPrice" class="p-mr-3" icon="price" label="today share price" unit="BUSD"/>
          <TextPair :data="prediction.state" icon="state" label="state"/>
        </div>
      </div>
    </div>
    <template v-for="(outcome, index) in prediction.getChildrenList('asc')" :key="index">
      <div class="p-col-12 p-md-6">
        <PredictionOutcome :isMobile="isMobile" :outcome="outcome" :predictionPrice="predictionPrice"/>
      </div>
    </template>

  </div>

</template>

<script>
import PredictionOutcome from '@/views/pages/Milestone/components/PredictionOutcome'
import { mapActions } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { CONTRACTS_ACTION_TYPES } from '@/store/modules/contracts/contracts.module'

export default {
  name: 'Prediction',
  components: {
    PredictionOutcome
  },
  props: {
    prediction: Object,
    isMobile: Boolean
  },
  data: function () {
    return {
      predictionPrice: 0
    }
  },
  methods: {
    ...mapActions(MODULE_NAMES.CONTRACTS, {
      getSharePrice: CONTRACTS_ACTION_TYPES.GET_SHARE_PRICE
    })
  },
  async mounted () {
    this.predictionPrice = await this.getSharePrice({ prediction: this.prediction })
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
