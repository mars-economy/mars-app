<template>
  <div>
    <PreviousPageLink text="Back to the list of Milestones" class="p-mb-4" />

    <div class="p-d-flex">

      <div class="milestone-description p-mr-4">
        <Label :labels="['stepstone n', 'name']" class=" p-mb-3" />
        <Heading :name="milestone.name" class="p-my-1" level="2" />
        <div class="p-mt-3 text-body">{{milestone.description}}</div>
      </div>

      <PredictionList />

    </div>

  </div>
</template>

<script>
import PredictionList from '@/views/pages/Milestone/components/PredictionList'
export default {
  name: 'Milestone',
  components: {
    PredictionList
  },
  data: function () {
    return {
      milestone: {
        category: {
          id: '0x5ffabec44f7a4cd58bf8fae36fe99003'
        },
        description: '',
        id: '0x0f7f86d810024f96ad265b067ec6c348',
        name: 'Crew for first Human Exploration Announced',
        position: 1,
        status: 'Current'
      }
    }
  },
  methods: {
    getMilestone () {
      console.log(this.$store.state.phases.milestones)
      // return $this.store.state.phases.milestones.filter(item => item.id === '0x0f7f86d810024f96ad265b067ec6c348')
    }
  }
}
</script>

<style scoped lang="scss">
  .milestone-description {
    width: 31%;
  }

</style>
