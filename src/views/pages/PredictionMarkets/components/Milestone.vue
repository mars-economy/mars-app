<template>
  <div class="p-d-flex milestone-data p-jc-between p-ai-center p-my-2">

    <div class="milestone-data-item milestone">
      {{ milestone.name }}
    </div>
    <div class="milestone-data-item state">
      <TextPair :data="milestone.status.toUpperCase()" icon="state"/>
    </div>
    <div class="milestone-data-item predictors">
      <TextPair :data="milestone.predictorsNumber" icon="users"/>
    </div>
    <div class="milestone-data-item action">
      <Button label="see predictions"
              class="btn-primary"
              icon="pi pi-angle-right"
              iconPos="right" @click="onLoadMilestone(milestone.id)"/>
    </div>

  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Milestone',
  props: {
    milestone: Object
  },
  methods: {
    getTime: function (time) {
      return moment.unix(time).format('MMMM YYYY')
    },
    onLoadMilestone (id) {
      this.$router.push('/milestone/' + id)
    }
  }
}
</script>

<style lang="scss">
  .milestone-data-item {
    &.milestone { width: 260px; }
    &.state { width: 85px; }
    &.predictors { width: 70px; }
    &.action { width: 170px; }
  }
</style>
