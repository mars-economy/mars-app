<template>
  <div class="stepstone p-grid" :class="{'mobile' : isMobile}">

    <div class="stepstone-description p-pr-md-6 p-col-12 p-lg-4">
      <Label :labels="'stepstone '+stepstone.position" class="label-muted p-mb-3"/>
      <Heading :name="stepstone.name" class="p-my-1" level="2"/>
      <div class="p-my-lg-3 text-body"> {{ stepstone.description }}</div>
    </div>

    <div class="p-col-12 p-lg-8">
      <MilestoneList :isMobile="isMobile" :milestones="stepstone.searchChildrenList('status', status)" class="fx-grow"/>
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
    isMobile: Boolean,
    status: String
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

  .stepstone.mobile {
    padding-top: 16px;
  }

</style>
