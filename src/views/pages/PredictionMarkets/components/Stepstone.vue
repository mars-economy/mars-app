<template>
  <div class="stepstone p-d-flex p-my-4">

    <div class="stepstone-description p-pr-6">
      <Label :labels="'stepstone '+stepstone.index" class="label-muted p-mb-3" />
      <Heading :name="stepstone.name" level="2" class="p-my-1" />
      <div class="p-mt-3 text-body"> {{stepstone.description}}</div>
    </div>

      <MilestoneList :milestones="milestones" class="fx-grow" />

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
        { name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ', dueTo: '1699864699', predictors: '12456' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .stepstone-description {
    width: 29%;
  }

</style>
