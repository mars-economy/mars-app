<template>

  <div class="btn p-d-inline-flex  p-jc-center p-ai-center" :class="'btn-'+size" :color="color">
    <span>{{name}}</span>
    <template v-if="icon">
      <div class="btn-icon">
        <svg width="6" height="8" viewBox="0 0 6 8" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.833496 0.809508L0.833496 1.65004C0.833496 1.83284 0.921313 2.00668 1.07006 2.11421L3.67589 3.99958L1.07006 5.88495C0.921313 5.99248 0.833496 6.16453 0.833496 6.34912L0.833496 7.18965C0.833496 7.30614 0.966117 7.37424 1.0611 7.30614L5.46985 4.11607C5.54871 4.05872 5.54871 3.94223 5.46985 3.88488L1.0611 0.694808C0.966117 0.624913 0.833496 0.693017 0.833496 0.809508Z"/>
        </svg>
      </div>
    </template>
  </div>

</template>

<script>
export default {
  name: 'Button',
  props: {
    name: String,
    color: String,
    size: String,
    action: String,
    icon: { type: Boolean, default: false }
  }
}
</script>

<style scoped lang="scss">

.btn {
  font-family: $fontFamily;
  font-size: 0.75rem;
  line-height: 1em;
  text-align: center;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 0.5em 1.6em;
  min-height: 2.5rem;
  box-sizing: border-box;
  backdrop-filter: blur(20px);
  border-radius: $radius-base;
  cursor: pointer;
  fill: $colorPrimary;

  &[color='primary'] {
    background-color: rgba($colorPrimary, 0.1);
    border: 1px solid rgba($colorPrimary, 0.05);
    color: $colorPrimary;
    fill: $colorPrimary;
    &:hover {
      background-color: rgba($colorPrimary, 0.2);
    }
  }

  &[color='light'] {
    background-color: rgba($white, 0.05);
    border: 1px solid rgba($white, 0.05);
    color: $white;
    fill: $white;
    &:hover {
      background-color: rgba($white, 0.1);
    }
  }

  &.small {
    padding: 0.5em 1em;
    min-height: 1.625rem;
  }

  &.block {
    width: 100%;
  }
}

.btn-icon {
  width: 1.66em;
  height: 1.66em;
  background-color: rgba($colorPrimary, 0.05);
  border: 1px solid rgba($colorPrimary, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.6em;
}

</style>
