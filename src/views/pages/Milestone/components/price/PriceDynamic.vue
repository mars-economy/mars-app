<template>
  <div class="p-d-flex p-flex-column price-panel-dynamic p-jc-between">
    <div class="price-panel-dynamic-line p-d-flex p-jc-between p-ai-center p-mx-3" v-if="!isMobile">
      <svg class="dot" width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="1" cy="1" r="1" fill="white"/>
      </svg>
      <svg class="arrow" width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0L5 5L0 10V0Z" fill="white"/>
      </svg>
    </div>
      <div class="w-100 p-d-flex p-jc-md-center p-ai-center p-pb-2">
        <TextPair :data="calculatePriceGrowth" icon="profit" label="monthly growth" unit="%"/>
      </div>
    <div class="w-100 p-d-flex p-jc-md-center p-ai-center">You win more if you predict earlier</div>
  </div>
</template>

<script>
export default {
  name: 'PriceDynamic',
  props: {
    isMobile: Boolean,
    meta: Object
  },
  computed: {
    calculatePriceGrowth () {
      const lF = (this.meta.endSharePrice - this.meta.startSharePrice) * 259200000
      const rF = (this.meta.predictionTimeEnd - this.meta.predictionTimeStart) * this.meta.startSharePrice
      return Math.round(lF / rF)
    }
  }
}
</script>

<style lang="scss">
    .price-panel-dynamic {
      position: relative;
      font-size: 14px;
      text-align: center;
      flex-grow: 1;

      .price-panel-dynamic-line {
        position: absolute;

        &:not(.mobile) {
          background-image: url("data:image/svg+xml,%3Csvg width='315' height='2' viewBox='0 0 315 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.00158691 1H315' stroke='white' stroke-opacity='0.6' stroke-dasharray='1 8'/%3E%3C/svg%3E%0A");
          left: 0;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          background-repeat: repeat-x;
          background-position: left center;
        }
      }
      .w-100 {
        flex: 1 0 50%;
      }
    }

</style>
