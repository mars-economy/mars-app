<template>
  <div>
    <PreviousPageLink class="p-mb-4" text="Back to the list of Milestones"/>
    <div v-if="Object.keys(milestone).length > 0" class="p-d-flex">
      <div class="milestone-description p-mr-4">
        <Label :labels="['stepstone '+milestone.category.position, milestone.category.name]" class=" p-mb-3"/>
        <Heading :name="milestone.name" class="p-my-1" level="2"/>
        <TextPair :data="milestone.status" label="current state" icon="state" class="p-my-3"></TextPair>
        <div class="p-mt-3 text-body">{{ milestone.description }}</div>
      </div>
      <PredictionList :predictions="milestone.predictions"/>
    </div>
  </div>
</template>

<script>
import PredictionList from '@/views/pages/Milestone/components/PredictionList'
import { mapState } from 'vuex'
import { MODULE_NAMES } from '@/store'

export default {
  name: 'Milestone',
  components: {
    PredictionList
  },
  data: function () {
    return {
      milestoneUuid: null
    }
  },
  watch: {
    $route: {
      handler: async function (route) {
        if (route.params.id) {
          this.milestoneUuid = route.params.id
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState(MODULE_NAMES.PHASES, {
      milestone (state) {
        let milestone = {}
        if (!this.milestoneUuid) {
          return milestone
        }
        milestone = Array.from(state.milestones).find(item => item.id === this.milestoneUuid) || {}
        if (Object.keys(milestone).length > 0) {
          const predictions = Array.from(state.predictions).filter(item => item.milestone.id === this.milestoneUuid)
          Object.assign(milestone, { predictions })
        }
        return milestone
      }
    })
  }
}
</script>

<style scoped lang="scss">
  .milestone-description {
    width: 31%;
  }

</style>
