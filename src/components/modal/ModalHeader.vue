<template>
  <div :class="'l'+level" class="modal-header">
    {{ header }}
  </div>
</template>

<script>
export default {
  name: 'ModalHeader',
  props: {
    header: String,
    level: String
  }
}
</script>

<style lang="scss" scoped>
</style>
