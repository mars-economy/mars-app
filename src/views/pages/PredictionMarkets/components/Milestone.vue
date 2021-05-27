<template>
  <div class="p-d-flex milestone-data p-jc-between p-my-3 p-my-md-2" :class="{'mobile' : isMobile}">

    <CardLabel label="milestone" labelPos="left" v-if="isMobile"/>

    <div class="milestone-data-item milestone h4">
      {{ milestone.name }}
    </div>
    <div class="milestone-data-item state">
      <TextPair :data="milestone.status" icon="state"/>
    </div>
    <div class="milestone-data-item predictors">
      <TextPair :data="getMilestonePredictorNumber(milestone)" icon="users"/>
    </div>
    <div class="milestone-data-item action p-as-center">
      <Button label="see predictions"
              class="btn-primary p-mx-auto"
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
    milestone: Object,
    isMobile: Boolean
  },
  methods: {
    getTime: function (time) {
      return moment.unix(time).format('MMMM YYYY')
    },
    onLoadMilestone (id) {
      this.$router.push('/milestone/' + id)
    },
    getMilestonePredictorNumber (milestone) {
      let pNumbers = 0
      milestone.getChildrenList().forEach(p => {
        pNumbers += +p.predictorsNumber
      })
      return pNumbers
    }
  }
}
</script>

<style lang="scss">
  .milestone-data:not(.mobile) {
    align-items: center;

    font-weight: 400;
    .milestone-data-item {
      &.milestone {
        width: 260px;
      }

      &.state {
        width: 85px;
      }

      &.predictors {
        width: 70px;
      }

      &.action {
        width: 170px;
      }
    }
  }

  .milestone-data.mobile {
    @extend %card-bg;
    padding: 42px 16px 16px 16px;
    flex-direction: column;
    align-items: stretch;

    .h4 {
      margin-bottom: 14px;
    }
  }
</style>
