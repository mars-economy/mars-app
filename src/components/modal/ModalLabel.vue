<template>
  <div class="modal-label">
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
  name: 'ModalLabel',
  props: [
    'labels'
  ]
}
</script>

<style lang="scss" scoped>
  .modal-label {
    @extend %card-label;
    @extend %h5;
    top: -1px;
    left: -1px;
    border-bottom-right-radius: $radius-base;
    border-top-left-radius: $radius-base;
    box-sizing: content-box;
    backdrop-filter: blur(20px);

    .muted {
      opacity: 0.5
    }

    .modal-label-divider {
      margin: 0 8px;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: rgba($white, 0.05);
      }
    }
  }
</style>
