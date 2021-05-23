<template>
  <div>
    <div class="p-d-flex milestone-list-headers p-jc-between p-mb-1" v-if="!isMobile">
      <div v-for="(header, index) in columnHeaders"  class="milestone-data-item" :class="header" :key="index">
        {{ header }}
      </div>
    </div>
    <div class="text-small-base" :class="{'milestone-list-content' : !isMobile}">
      <template v-for="(milestone, index) in milestones" :key="index">
        <Milestone :milestone="milestone" :isMobile="isMobile"/>
        <Divider type="solid" v-if="!isLastItem(index) && !isMobile" />
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
    milestones: Array,
    isMobile: Boolean
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
    font-weight: bold;
    padding: 12px 32px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: $border-light;
    .milestone-data-item {
      opacity: 0.5;
      &.milestone { width: 260px; }
      &.state { width: 85px; }
      &.predictors { width: 70px; }
      &.action { width: 170px; }
    }

  }
  .milestone-list-content {
    background: rgba($black, 0.01);
    border: 1px solid rgba($white, 0.05);
    backdrop-filter: blur(60px);
    border-radius: 2px 2px 8px 8px;
    padding: 12px 32px;
  }
</style>
