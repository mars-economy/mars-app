<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="prediction-title p-d-flex p-flex-column" :class="{'mobile' : isMobile}">
        <div class="prediction-panel-p p-d-flex p-ai-start p-ai-md-center">
          <NumberCircle :number="prediction.position" class="p-mr-2" v-if="!isMobile"></NumberCircle>
          <span class="text-body p-text-bold p-ml-1">{{ prediction.name }}</span>
        </div>
        <div v-if="!isMobile" class="prediction-info p-d-flex p-ai-start p-ai-md-center">
          <TextPair :data="prediction.state" class="p-mr-4" icon="state" label="state"/>
          <TextPair v-if="prediction?.meta?.predictionTimeEnd" :data="prepareDate(prediction?.meta?.predictionTimeEnd)"
                    class="p-mr-4"
                    icon="date"
                    label="prediction end date "/>
          <TextPair :data="predictionPrice" icon="price" label="today share price" unit="BUSD"/>
        </div>
        <div v-if="prediction?.meta" class="prediction-panel-p p-d-flex p-ai-start p-ai-md-center p-ac-between">
          <PricePanel :is-mobile="isMobile" :meta="prediction.meta"></PricePanel>
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
import PricePanel from '@/views/pages/Milestone/components/price/PricePanel'
import { getFormattedData } from '@/helpers/date.helper'

export default {
  name: 'Prediction',
  components: {
    PricePanel,
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
    }),
    prepareDate (timeS) {
      return getFormattedData(timeS)
    }
  },
  async mounted () {
    this.predictionPrice = await this.getSharePrice({ prediction: this.prediction })
  }
}
</script>

<style lang="scss">
  .prediction-info {
    background: rgba(255, 255, 255, 0.03);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding: 13px 25px;
  }

  .prediction-title {
    @extend %card-bg;
    border: $border-light;

    .prediction-panel-p {
      padding: 16px 24px;
    }

    &.mobile {
      .prediction-panel-p {
        padding: $card-padding-mobile-h
      }
    }
  }

</style>
