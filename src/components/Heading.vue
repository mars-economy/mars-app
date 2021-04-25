<template>
  <div :class="'h'+level">
    {{ name }}
  </div>

</template>

<script>
export default {
  name: 'Heading',
  props: {
    name: String,
    level: String
  }
}
</script>

<style scoped>

</style>
