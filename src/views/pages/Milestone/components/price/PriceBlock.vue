<template>
  <div :class="{'p-flex-column' : isMobile}"
       class="p-d-inline-flex p-flex-row p-jc-between p-ai-center prediction-panels">
    <Panel class="prediction-price-panel bordered">
      <template #header>
        <span class="p-mr-3">initial price</span>
        <span>[ March ‘21 ]</span>
      </template>
      <TextPair :data="meta.startSharePrice" icon="price" unit="BUSD"/>
    </Panel>
    <Panel class="prediction-price-panel no-border p-as-stretch">
      <template #header>
        <div class="panel-w-100 p-d-flex p-jc-center">
          <TextPair :data="4" icon="profit" label="monthly growth" unit="%"/>
        </div>
      </template>
      <span class="panel-w-100"></span>
      <span class="panel-w-100">You win more if you predict earlier</span>
    </Panel>
    <Panel class="prediction-price-panel bordered">
      <template #header>
        <span class="p-mr-3">final price</span>
        <span>[ June ‘23 ]</span>
      </template>
      <TextPair :data="meta.endSharePrice" icon="price" unit="BUSD"/>
    </Panel>
  </div>
</template>

<script>
export default {
  name: 'PriceBlock',
  props: {
    meta: Object,
    isMobile: Boolean
  }
}
</script>

<style lang="scss">
  //.prediction-panels {
  //  width: 100%;
  //}
  //
  //.prediction-price-panel {
  //  &.bordered {
  //    background: rgba(255, 255, 255, 0.05);
  //    border: 1px solid rgba(255, 255, 255, 0.1);
  //    box-sizing: border-box;
  //    border-radius: 4px;
  //
  //    .p-toggleable-content {
  //      border-top: 1px solid rgba(255, 255, 255, 0.1);
  //    }
  //
  //    .p-panel-header, .p-panel-content {
  //      padding: 8px 12px;
  //      display: flex;
  //    }
  //  }
  //
  //  &.no-border {
  //    text-align: center;
  //
  //    .panel-w-100 {
  //      width: 100%
  //    }
  //
  //    .p-panel-header {
  //      padding-bottom: 15px;
  //
  //    }
  //
  //    .p-panel-content {
  //      padding-top: 8px;
  //    }
  //  }
  //
  //  font-size: 14px;
  //  display: flex;
  //  flex-direction: column;
  //
  //  .p-panel-header {
  //    opacity: 0.5;
  //  }
  //}
</style>
