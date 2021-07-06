<template>
  <div class="stake-panel card" :class="{'mobile' : isMobile}">
    <PanelCollapse collapsed
                   :toggleable="true"
                   textToggle="Show" textToggleAlt="Hide"
                   panel-footer="mobile"
                   :is-mobile="isMobile">
      <template #header>
        <div class="p-d-flex p-jc-between p-ai-center">
          <div>
            <div class="h5 text-primary">Stake $DMT tokens</div>
            <div class="text-smallest text-primary muted">You must stake your $DMT to take part in governance.</div>
          </div>
          <Button class="btn-light btn-small p-ml-auto" label="Buy $DMT" v-if="!isMobile"/>
        </div>

      </template>

      <template #panel-content-before>
        <Button class="btn-light btn-small p-mx-3 p-mb-3" label="Buy $DMT" v-if="isMobile"/>
      </template>

      <template #accent>
        <div class="card-accent-line p-jc-between p-ai-center p-py-3 p-d-sm-flex">
          <div class="p-d-sm-flex p-jc-start p-ai-center p-flex-wrap">
            <TextPair data="56.26" unit="%" icon="profit" label="APR" class="p-mr-4 p-mb-3 p-mb-lg-0"/>
            <TextPair data="12456678" unit="$DMT" icon="coins" label="liquidity" class="p-mr-4 p-mb-3 p-mb-lg-0"/>
            <TextPair data="0" unit="$DMT" icon="coins" label="your current stake" class="p-mr-4 p-mb-3 p-mb-lg-0"/>
            <TextPair data="0" unit="$DMT" icon="win" label="your current earnings" class="p-mr-4 p-mb-3 p-mb-lg-0"/>
          </div>
          <div>
            <span class="p-ml-auto text-link p-text-nowrap" v-if="!isMobile">View contract</span>
            <Button label="View contract" class="btn-light btn-small" v-else />
          </div>
        </div>
      </template>
      <div class="p-grid">
        <div class="p-col-12 p-sm-5 p-lg-4">
          <EarningInputForm :amount=0 />
        </div>
        <Divider type="solid" v-if="isMobile" class="p-mb-3"/>
        <div class="p-col-12 p-sm-7 p-lg-8">
          <StakeInputForm :is-mobile="isMobile"/>
        </div>

      </div>

    </PanelCollapse>
  </div>
</template>

<script>
import StakeInputForm from '@/views/pages/Governance/components/stake/StakeInputForm'
import EarningInputForm from '@/views/pages/Governance/components/stake/EarningInputForm'
export default {
  name: 'StakePanel',
  components: {
    EarningInputForm,
    StakeInputForm
  },
  props: {
    isMobile: Boolean
  }
}
</script>

<style scoped>

</style>
