<template>
  <div class="outcome card">
    <div class="card-header p-py-3 p-d-flex p-ai-center p-jc-between text-primary">
      <div>Agree</div>
      <Probability value=25 />
    </div>
    <div class="card-profit p-py-2">
      <TextPair data="130%" label="estimated profit" icon="profit" />
    </div>
    <div class="card-body p-py-3">
      <Button label="Connect wallet" class="btn-primary btn-block"/>
    </div>
    <div class="card-footer p-d-flex p-ai-center p-jc-end">
      <Button label="See more" class="btn-text" icon="pi pi-angle-down" iconPos="right"/>
    </div>
  </div>

</template>

<script>
export default {
  name: 'PredictionOutcomes'
}
</script>

<style scoped lang="scss">
  .outcome {
    width: calc(50% - 2rem);
  }

</style>
