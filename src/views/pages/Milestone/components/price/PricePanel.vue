<template>
  <div class="p-d-flex price-panel p-jc-between w-100">
    <div v-if="isMobile" class="fixed-arrow p-d-flex p-flex-column p-jc-between p-ai-center p-mr-3">
      <svg class="dot" width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="1" cy="1" r="1" fill="white"/>
      </svg>
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0L5 5L0 -4.37114e-07L10 0Z" fill="white"/>
      </svg>
    </div>
        <div :class="{'p-flex-column' : isMobile, 'p-flex-row': !isMobile}" class="p-d-flex p-jc-between w-100 p-ai-stretch">
          <PriceInfo :month="meta.predictionTimeStart" :price="meta.startSharePrice"
                     :title="'initial price'" :is-mobile="isMobile"></PriceInfo>
          <PriceDynamic :is-mobile="isMobile" :meta="meta" class="p-my-3 p-my-md-0"></PriceDynamic>
          <PriceInfo :month="meta.predictionTimeEnd" :price="meta.endSharePrice" :title="'final price'" :is-mobile="isMobile"></PriceInfo>
        </div>
  </div>
</template>

<script>
import PriceInfo from '@/views/pages/Milestone/components/price/PriceInfo'
import PriceDynamic from '@/views/pages/Milestone/components/price/PriceDynamic'

export default {
  name: 'PricePanel',
  components: {
    PriceDynamic,
    PriceInfo
  },
  props: {
    isMobile: Boolean,
    meta: Object
  }
}
</script>

<style lang="scss">
  .fixed-arrow {
    background-image: url("data:image/svg+xml,%3Csvg width='2' height='197' viewBox='0 0 2 197' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 0.00158691L0.999991 197' stroke='white' stroke-opacity='0.6' stroke-dasharray='1 8'/%3E%3C/svg%3E ");
    background-position: top center;
    background-repeat: repeat-y;
    flex: 0 0 auto;
  }

  .price-panel {
    margin: 0;
  }

</style>
