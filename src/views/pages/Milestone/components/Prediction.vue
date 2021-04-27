<template>
  <div>
    <div class="prediction-name p-d-flex p-ai-center p-mb-4">
      <NumberCircle :number="prediction.position" class="p-mr-2"></NumberCircle>
      <span class="text-body p-ml-1">{{ prediction.name }}</span>
    </div>
    <div class="p-d-flex p-jc-between">
      <PredictionOutcomes />
    </div>

  </div>

</template>

<script>
import PredictionOutcomes from '@/views/pages/Milestone/components/PredictionOutcomes'
export default {
  name: 'Prediction',
  components: {
    PredictionOutcomes
  },
  props: {
    prediction: Object
  },
  data: function () {
    return {
      outcomes: [
        {
          description: '',
          dueDate: '1735689600',
          id: '0x9fbb1106b708ea5e261acc6fdb9cd85fd3ec78ee',
          milestone: {
            category: {
              id: '0x5ffabec44f7a4cd58bf8fae36fe99003',
              name: 'Preparing for Mars'
            },
            id: '0x0f7f86d810024f96ad265b067ec6c348',
            name: 'Crew for first Human Exploration Announced'
          },
          name: 'By 2025',
          position: 1,
          predictorsNumber: 0,
          state: 'Open',
          token: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee'
        },
        {
          description: '',
          dueDate: '1735689600',
          id: '0x9f35f71610a4f748203fb20941cd881e83ac490b',
          milestone: {
            category: {
              id: '0x5ffabec44f7a4cd58bf8fae36fe99003',
              name: 'Preparing for Mars'
            },
            id: '0x0f7f86d810024f96ad265b067ec6c348',
            name: 'Crew for first Human Exploration Announced'
          },
          name: 'Which Agency?',
          position: 2,
          predictorsNumber: 0,
          state: 'Open',
          token: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">

  .prediction-name {
    @extend %card-bg;
    border: $border-light;
    padding: 20px 24px;
  }

</style>
