<template>
  <div class="stake-panel card">
    <PanelCollapse collapsed
                   :toggleable="true"
                   textToggle="Show" textToggleAlt="Hide">
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
          <TextPair data="56.26" unit="%" icon="profit" label="APR" class="p-mr-4"/>
          <TextPair data="12456678" unit="$DMT" icon="coins" label="liquidity" class="p-mr-4"/>
          <TextPair data="0" unit="$DMT" icon="coins" label="your current stake" class="p-mr-4"/>
          <TextPair data="0" unit="$DMT" icon="win" label="your current earnings" class="p-mr-4"/>
          <span class="p-ml-auto text-smallest muted clickable">View contract</span>
        </div>
      </template>
      <div class="p-grid">
        <div class="p-col-4">
          <EarningInputForm :amount=0 />
        </div>
        <div class="p-col-8">
          <StakeInputForm />
        </div>

      </div>

    </PanelCollapse>
  </div>
</template>

<script>
import StakeInputForm from '@/views/pages/Governance/components/StakeInputForm'
import EarningInputForm from '@/views/pages/Governance/components/EarningInputForm'
export default {
  name: 'StakePanel',
  components: {
    EarningInputForm,
    StakeInputForm
  }
}
</script>

<style scoped lang="scss">

.stake-panel-accent {
  @extend %card-px;
  background-color: $bg-light;
}

</style>
