<template>
  <Panel class="p-flex-column p-as-stretch price-panel-dynamic p-jc-center">
    <template #header>
      <div class="w-100 p-d-flex p-jc-center">
        <TextPair :data="calculatePriceGrowth" icon="profit" label="monthly growth" unit="%"/>
      </div>
    </template>
    <span v-if="!isMobile">
      <svg fill="none" height="10" viewBox="0 0 320 10" width="320" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.00159 5H316" stroke="white" stroke-dasharray="1 8" stroke-opacity="0.6"/>
        <path d="M315 0L320 5L315 10V0Z" fill="white"/>
        <circle cx="1" cy="5" fill="white" r="1"/>
      </svg>
    </span>
    <span class="p-jc-center">You win more if you predict earlier</span>
  </Panel>
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
  .p-panel {
    &.price-panel-dynamic {
      font-size: 14px;
      text-align: center;

      .p-panel-header {
        opacity: 1;
      }

      .p-toggleable-content {

        .p-panel-content {
          flex-direction: column;

          span {
            display: flex;
          }
        }
      }
    }
  }

</style>
