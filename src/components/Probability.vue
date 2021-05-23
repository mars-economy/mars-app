<template>
  <div class="probability p-d-inline-flex p-ai-center text-small ">
    <div class="probability-label p-mr-1">Probability </div>
    <div class="probability-value p-text-bold p-mr-2">{{value}}%</div>
    <PercentImage :value="value" />
  </div>

</template>

<script>
export default {
  name: 'Probability',
  props: {
    value: [Number, String]
  }
}
</script>

<style scoped>

</style>
