<template>
  <div class="label p-d-inline-flex p-ai-center">
    <template v-if="Array.isArray(labels)">
      <span class="muted p-pr-2">{{ labels[0] }}</span>
      <span class="label-divider p-mx-2"></span>
      <span class="p-pl-2">{{ labels[1] }}</span>
    </template>
    <template v-else>
      <span>{{ labels }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Label',
  props: {
    labels: [Array, String]
  }
}
</script>

<style scoped lang="scss">
  .label {
    @extend %label-bg;
    @extend %h5;
    border: $border-light;
    height: 26px;
    padding: 0 12px;
    .label-divider:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      border-left: $border-light;
    }
  }

</style>
