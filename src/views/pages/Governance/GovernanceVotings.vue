<template>
  <div class="p-d-flex p-flex-column p-ai-stretch" :class="{'mobile' : isMobile}">
    <Heading v-if="!isMobile" class="p-my-3" level="1" name="Governance Votings"/>
    <div class="headline" v-else>
      Governance
    </div>

    <div class="p-grid p-ai-center p-mt-1 p-my-3">
      <div class="text-smallest muted p-lg-4">
        Here is the list of predictions in the settlement state. Every user can start a voting for predictions with no consensus of Oracles, and Qualified $DMT holders can start a dispute in any prediction.
      </div>
      <div class="p-my-2 p-my-lg-0 p-col-12 p-lg-4 p-d-flex p-ai-center p-jc-center">
        <SelectButton v-model="option" :options="options" class="btn-select p-mx-auto" v-on:select="option = $event"/>
      </div>

      <template  v-if="option === 'current'">
        <Divider type="dashed" v-if="isMobile" />
        <div class="p-col-12 p-lg-4 p-ai-center switch p-my-2 p-my-lg-0 p-d-flex p-ai-center p-jc-lg-end p-jc-center">
      <span class="p-mr-2 clickable" :class="{'checked' : !showNotVoted}" @click="showNotVoted = false">
        show all votings</span>
          <InputSwitch v-model="showNotVoted"></InputSwitch>
          <span class="p-ml-2 clickable" :class="{'checked' : showNotVoted}" @click="showNotVoted = true">
        only not voted yet</span>
        </div>
      </template>

      <Divider type="dashed" v-if="isMobile" />

    </div>

    <StakePanel />

    <VotingList class="p-mt-3" />

  </div>
</template>

<script>
import SelectButton from 'primevue/selectbutton'
import InputSwitch from 'primevue/inputswitch'
import StakePanel from '@/views/pages/Governance/components/StakePanel'
import VotingList from '@/views/pages/Governance/components/VotingList'

export default {
  name: 'GovernanceVotings',
  components: {
    VotingList,
    StakePanel,
    SelectButton,
    InputSwitch
  },
  props: {
    isMobile: Boolean
  },
  data: function () {
    return {
      option: 'current',
      options: ['current', 'historical'],
      showNotVoted: false
    }
  }
}
</script>

<style scoped>

</style>
