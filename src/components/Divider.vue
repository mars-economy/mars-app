<template>
  <div class="p-divider" :style="{'border-style': type}"></div>

</template>

<script>
export default {
  name: 'Divider',
  props: {
    type: String
  }
}
</script>

<style scoped lang="scss">
  .p-divider {
    height: 1px;
    box-sizing: border-box;
    border-width: 1px 0 0 0;
    width: 100%;
    border-color: rgba($white, 0.05);
  }

</style>
