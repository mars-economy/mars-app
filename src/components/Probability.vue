<template>
  <div class="probability p-d-inline-flex p-ai-center">
    <div class="probability-label p-mr-1">Probability </div>
    <div class="probability-value p-mr-2">{{value}}%</div>
    <PercentImage :value="value" />
  </div>

</template>

<script>
export default {
  name: 'Probability',
  props: {
    value: Number
  }
}
</script>

<style scoped>

</style>
