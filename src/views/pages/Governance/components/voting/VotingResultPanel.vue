<template>
  <div class="p-d-flex p-flex-column p-flex-sm-row">
    <div v-for="item of outcomes" :key="item.outcome" class="p-mt-3 p-mr-sm-3">
      <div class="p-field-radiobutton field-button" :class="{ 'winning' : item.isWinningOutcome, 'voted' : item.voted }">
        <div class="p-radiobutton p-component">
          <div class="p-radiobutton-box" :class="{'p-highlight' : item.voted }">
            <div class="p-radiobutton-icon"></div>
          </div>
        </div>
        <label class="p-ml-2">{{item.name}}</label>
        <div class="field-append">
          {{item.percentage}}%
        </div>
      </div>
      <div class="text-smallest muted p-mt-2" v-if="getNote(item)">{{ getNote(item) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VotingResultPanel',
  props: {
    outcomes: Object
  },
  data: function () {
    return {
      result: null,
      voted: false
    }
  },
  methods: {
    getNote (outcome) {
      if (outcome.voted && outcome.isWinningOutcome) {
        return 'Your variant is the result'
      }
      if (outcome.voted && !outcome.isWinningOutcome) {
        return 'Your variant'
      }
      if (!outcome.voted && outcome.isWinningOutcome) {
        return 'The result'
      }
      if (!outcome.voted && !outcome.isWinningOutcome) {
        return null
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .p-field-radiobutton label {
    flex-grow: 1;
  }
  .field-append {
    padding-left: 12px;
    margin-left: 12px;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      transform: translateX(-12px);
      border-left: $border-light;
    }
  }
  .p-field-radiobutton {
    .p-radiobutton-box {
      opacity: 0.3;
    }
    &.winning {
      background-color: rgba($colorPrimary, 0.05);
      border: 2px solid rgba($colorPrimary, 0.5);
      color: $colorPrimary;
      .p-radiobutton-box {
        border-color: $colorPrimary;
      }
      .p-radiobutton-icon {
        background-color: $colorPrimary;
      }
      .field-append:before {
        border-left: 2px solid rgba($colorPrimary, 0.5);
      }
    }
    &:not(.voted) {
      .p-radiobutton-box {
        display: none;
      }
      label { margin-left: 0 !important}
    }
  }

</style>
