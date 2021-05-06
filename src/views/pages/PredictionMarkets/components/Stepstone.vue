<template>
  <div class="stepstone p-d-flex p-my-4">

    <div class="stepstone-description p-pr-6">
      <Label :labels="'stepstone '+stepstone.position" class="label-muted p-mb-3"/>
      <Heading :name="stepstone.name" class="p-my-1" level="2"/>
      <div class="p-mt-3 text-body"> {{ stepstone.description }}</div>
    </div>

    <MilestoneList :milestones="stepstone.getChildrenList()" class="fx-grow"/>

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
  // data: function () {
  //   return {
  //     milestones: [
  //       { name: 'Crew for first Human Exploration Announced', state: 'open', predictors: '12456' },
  //       { name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ', state: 'open', predictors: '12456' }
  //     ]
  //   }
  // },
  methods: {
    // milestones (categoryId, categoryIndex) {
    //   return this.$store.state.phases.milestones
    //     .filter(item => item.category.id === categoryId)
    //     .map((value, index, arr) => {
    //       let predictors = 0
    //       const predictions = this.$store.state.phases.predictions.filter(item => item.milestone.id === arr[index].id)
    //       Array.from(predictions).forEach(prediction => {
    //         predictors += prediction.predictorsNumber
    //       })
    //       Object.assign(arr[index], {
    //         predictions,
    //         predictors
    //       })
    //       return arr[index]
    //     })
    // }
  }
}
</script>

<style scoped lang="scss">
  .stepstone-description {
    width: 29%;
  }

</style>
