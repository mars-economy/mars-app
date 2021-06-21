<template>
  <div class="p-grid price-panel nested-grid">
    <div v-if="isMobile" class="p-col-fixed fixed-arrow">555</div>
    <div class="p-col">
      <div class="p-grid">
        <div :class="{'p-flex-column' : isMobile, 'p-flex-row': !isMobile}" class="p-d-flex p-jc-between">
          <PriceInfo :month="meta.predictionTimeStart" :price="meta.startSharePrice"
                     :title="'initial price'"></PriceInfo>
          <PriceDynamic :is-mobile="isMobile" :meta="meta"></PriceDynamic>
          <PriceInfo :month="meta.predictionTimeEnd" :price="meta.endSharePrice" :title="'final price'"></PriceInfo>
        </div>
      </div>
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
    width: 100px;
  }

  .price-panel.p-grid {
    margin: 0;
  }

  .nested-grid {
    .p-grid {
      margin: 0;
    }
  }

  .p-grid {
    width: 100%;
  }
</style>
