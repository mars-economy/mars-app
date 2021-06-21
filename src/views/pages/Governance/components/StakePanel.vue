<template>
  <div class="stake-panel card">
    <PanelCollapse collapsed
                   :toggleable="true"
                   textToggle="Show more" textToggleAlt="Show less">
      <template #header>
        <div class="p-d-flex p-jc-between p-ai-center">
          <div>
            <div class="h5 text-primary">Stake $DMT tokens</div>
            <div class="text-smallest text-primary muted">You must stake your $DMT to take part in governance.</div>
          </div>
          <Button class="btn-light btn-small p-ml-auto" label="Buy $DMT"/>
        </div>

      </template>
      <template #accent>
        <div class="stake-panel-accent p-d-flex p-jc-between p-ai-center p-py-3">
          <TextPair :data="estimatedProfit" unit="%" icon="profit" label="estimated profit"/>
          <TextPair :data="estimatedProfit" unit="%" icon="profit" label="estimated profit"/>
          <TextPair :data="estimatedProfit" unit="%" icon="profit" label="estimated profit"/>
          <span class="p-ml-auto text-smallest muted clickable">View contract</span>
        </div>
      </template>
      Content

    </PanelCollapse>
  </div>
</template>

<script>
export default {
  name: 'StakePanel'
}
</script>

<style scoped lang="scss">

.stake-panel-accent {
  @extend %card-px;
  background-color: $bg-light;
}

</style>
