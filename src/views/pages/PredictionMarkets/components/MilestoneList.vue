<template>
  <div>
    <div class="p-d-flex milestone-list-headers p-jc-between p-mb-1">
      <div v-for="(header, index) in columnHeaders"  class="milestone-data-item" :class="header" :key="index">
        {{ header }}
      </div>
    </div>
    <div class="milestone-list-content text-small-base">
      <template v-for="(milestone, index) in milestones" :key="index">
        <Milestone :milestone="milestone" />
        <Divider type="solid" v-if="!isLastItem(index)" />
      </template>
    </div>
  </div>
</template>

<script>
import Milestone from './Milestone'

export default {
  name: 'MilestoneList',
  components: {
    Milestone
  },
  props: {
    milestones: Array
  },
  data: function () {
    return {
      columnHeaders: [
        'milestone', 'state', 'predictors', 'action'
      ]
    }
  },
  methods: {
    isLastItem (index) {
      return index === this.milestones.length - 1
    }
  }
}
</script>

<style scoped lang="scss">
  .milestone-list-headers {
    @extend %card-bg;
    @extend %h5;
    padding: 8px 32px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: $border-light;
  }
  .milestone-list-content {
    @extend %card-bg;
    padding: 12px 32px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border: $border-light;
  }
</style>
