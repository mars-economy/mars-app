<template>

  <div class="p-d-flex p-ai-center clickable connector">
    <div class="connector-icon icon-small p-d-flex p-ai-center p-jc-center p-mr-2">
      <img :alt="connector.name" :src="connector.icon">
    </div>
    <div class="connector-name">{{ connector.name }}</div>
  </div>

</template>

<script>
export default {
  name: 'WalletConnector',
  props: {
    connector: Object
  }
}
</script>

<style scoped lang="scss">

  .connector {
    line-height: 16px;
    &:hover .connector-name {
      opacity: 1;
    }
  }
  .connector-icon {
    flex: 0 0 16px;
    img {
      max-height: 100%;
      max-width: 100%;
    }
  }
  .connector-name {
    opacity: 0.5;
    font-weight: 700;
    white-space: nowrap;
  }

</style>
