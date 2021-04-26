<template>
  <div class="label p-d-inline-flex">
    <template v-if="Array.isArray(labels)">
      <span class="muted">{{ labels[0] }}</span>
      <span class="modal-label-divider"></span>
      <span>{{ labels[1] }}</span>
    </template>
    <template v-else>
      <span>{{ labels }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Label',
  props: [
    'labels'
  ]
}
</script>

<style scoped lang="scss">
  .label {
    @extend %label-bg;
    @extend %h5;
    border: $border-light;
    padding: 6px 12px;
  }

</style>
