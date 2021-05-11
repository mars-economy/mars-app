<template>
  <div class="p-divider" :class="type"></div>

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

    &.solid {
      border-style: solid;
    }

    &.dashed {
      border: none;
      background-image: url("data:image/svg+xml,%3Csvg width='272' height='1' viewBox='0 0 272 1' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect opacity='0.5' x='0.25' y='0.25' width='271.5' height='0.5' stroke='white' stroke-width='0.5' stroke-dasharray='1 6'/%3E%3C/svg%3E%0A");
    }

    &.dotted {
      border-style: dotted;
    }
  }

</style>
