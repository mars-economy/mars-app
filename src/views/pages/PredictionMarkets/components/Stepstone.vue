<template>
  <div class="stepstone p-grid">
    <div class="p-col-4 stepstone-description p-pr-6">
      <Label :labels="'stepstone '+stepstone.index" class="label-muted p-mb-3"></Label>
      <Heading :name="stepstone.name" level="2" class="p-my-1"></Heading>
      <div class="p-mt-3 text-body"> {{stepstone.description}}</div>
    </div>

    <div class="p-col">
      <MilestoneList :milestones="milestones"></MilestoneList>
    </div>

  </div>

</template>

<script>
import Label from '@/components/Label'
import MilestoneList from '@/views/pages/PredictionMarkets/components/MilestoneList'
export default {
  name: 'Stepstone',
  components: {
    MilestoneList,
    Label
  },
  props: {
    stepstone: Object
  },
  data: function () {
    return {
      milestones: [
        { name: 'Crew for first Human Exploration Announced', dueTo: '1688862699', predictors: '12456' },
        { name: 'Crew for first Human', dueTo: '1699864699', predictors: '12456' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .stepstone-description {
    //;
  }

</style>
