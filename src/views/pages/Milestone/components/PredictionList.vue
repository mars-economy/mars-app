<template>
  <div class="prediction-list p-d-flex p-flex-column fx-grow">
    <Prediction :prediction="predictions[0]" />
  </div>

</template>

<script>
import Prediction from '@/views/pages/Milestone/components/Prediction'
export default {
  name: 'PredictionList',
  components: {
    Prediction
  },
  data: function () {
    return {
      predictions: [
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

<style scoped>

</style>
