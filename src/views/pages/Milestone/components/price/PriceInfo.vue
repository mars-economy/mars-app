<template>
  <Panel class="bordered p-flex-column price-panel-info p-as-center">
    <template #header>
      <span>{{ title }}</span>
      <span class="p-ml-auto">{{ printMonth(month) }}</span>
    </template>
    <TextPair :data="price" icon="price" unit="BUSD"/>
  </Panel>
</template>

<script>
import moment from 'moment'

export default {
  name: 'PriceInfo',
  props: {
    price: Number,
    title: String,
    month: Number
  },
  methods: {
    printMonth (timeS) {
      return `[ ${moment(timeS * 1000).utc().format('MMMM `YY')} ]`
    }
  }
}
</script>

<style lang="scss">
  .p-panel {
    display: flex;

    &.price-panel-info {
      min-width: 200px;
      font-size: 14px;
    }

    &.bordered {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-sizing: border-box;
      border-radius: 4px;
    }

    .p-panel-header, .p-panel-content {
      padding: 8px 12px;
      display: flex;
    }

    .p-panel-header {
      align-content: space-between;
      opacity: 0.5;

      span {
        display: flex;
      }
    }
  }
</style>
