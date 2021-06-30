<template>
  <div class="card-label p-d-inline-flex p-ai-center" :class="getLabelClass()">
      <span>{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: 'CardLabel',
  props: {
    label: String,
    labelPos: String,
    color: String
  },
  methods: {
    getLabelClass () {
      let cls = this.labelPos ? 'label-' + this.labelPos : ''
      cls += this.color ? ' label-' + this.color : ''
      return cls
    }
  }
}
</script>

<style scoped lang="scss">
  .card-label {
    backdrop-filter: blur(20px);
    position: absolute;
    padding: 5px 12px;
    @extend %h5;
    top: 0;

    &.label-right {
      right: 0;
      border-bottom-left-radius: $radius-base;
    }
    &.label-center {
      left: 50%;
      transform: translateX(50%);
      border-bottom-left-radius: $radius-base;
      border-bottom-right-radius: $radius-base;
    }
    &.label-left {
      left: 0;
      border-bottom-right-radius: $radius-base;
    }
    &:not(.label-primary) {
      background-color: rgba($white, 0.1);
    }
    &.label-primary {
      background-color: rgba($colorPrimary, 0.1);
      color: $colorPrimary
    }
  }
</style>
