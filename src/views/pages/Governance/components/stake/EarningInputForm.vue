<template>
  <div class="earning-input">
    <div class="p-d-flex p-jc-between p-ai-center p-mb-2">
      <div class="text-smallest muted">amount farmed so far</div>
    </div>
    <div class="p-d-sm-flex p-jc-between p-ai-center p-mb-2">
      <input class="input-simple" :placeholder="amount" :class="{'muted' : amount === 0}">
      <div v-if="amount !== 0">
        <Button label="get earnings" class="btn-primary p-ml-sm-2 btn-block p-mt-3 p-mt-sm-0" />
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'EarningInputForm',
  props: {
    amount: Number
  }
}
</script>

<style scoped>

</style>
