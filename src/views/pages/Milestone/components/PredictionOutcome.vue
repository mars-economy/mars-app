<template>
  <div class="outcome card">
    <div class="card-header p-py-3 p-d-flex p-ai-center p-jc-between text-primary">
      <div>{{ outcome.name }}</div>
      <Probability :value=outcome.probability />
    </div>
    <div class="card-profit p-py-2">
      <TextPair :data="outcome.profit+'%'" label="estimated profit" icon="profit" />
    </div>
    <div class="card-body p-py-3">
      <Button label="Connect wallet" class="btn-primary btn-block"/>
    </div>
    <div class="card-footer-collapse">
      <PanelCollapse header="Show more" headerAlt="Show less" headerPos="right" :panelId="outcome.id" collapsed>
        <TextPair :data="outcome.stake" label="total stake" icon="coins" />
      </PanelCollapse>
    </div>
  </div>

</template>

<script>
export default {
  name: 'PredictionOutcome',
  props: {
    outcome: Object
  }
}
</script>

<style scoped lang="scss">
  .outcome {
    width: 47%;
  }

</style>
