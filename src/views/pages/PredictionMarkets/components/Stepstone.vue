<template>
  <div class="stepstone p-grid p-my-0 p-my-sm-3 p-my-lg-4" :class="{'mobile' : isMobile}">

    <div class="stepstone-description p-pr-md-6 p-col-12 p-lg-4">
      <Label :labels="'stepstone '+stepstone.position" class="label-muted p-mb-3"/>
      <Heading :name="stepstone.name" class="p-my-1" level="2"/>
      <div class="p-my-3 text-body"> {{ stepstone.description }}</div>
    </div>

    <div class="p-col-12 p-lg-8">
      <MilestoneList :milestones="stepstone.getChildrenList()" class="fx-grow" :isMobile="isMobile" />
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
    stepstone: Object,
    isMobile: Boolean
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

  .stepstone.mobile {
    padding-top: 16px;
  }

</style>
