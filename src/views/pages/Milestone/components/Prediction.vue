<template>
  <div>
    <div class="prediction-name p-d-flex p-ai-center p-mb-4">
      <NumberCircle :number="prediction.position" class="p-mr-2"></NumberCircle>
      <span class="text-body p-ml-1">{{ prediction.name }}</span>
    </div>
    <div class="p-d-flex p-jc-between p-flex-wrap p-ai-start">
      <template v-for="(outcome, index) in outcomes" :key="index">
        <PredictionOutcome :outcome="outcome" />
      </template>
    </div>

  </div>

</template>

<script>
import PredictionOutcome from '@/views/pages/Milestone/components/PredictionOutcome'
export default {
  name: 'Prediction',
  components: {
    PredictionOutcome
  },
  props: {
    prediction: Object
  },
  data: function () {
    return {
      outcomes: [
        {
          id: '0x6f2c59ae3ef74e48a11e6906e960fa9e',
          name: 'NASA',
          position: 1,
          prediction: {
            id: '0x9f35f71610a4f748203fb20941cd881e83ac490b'
          },
          probability: 55,
          profit: 130,
          stake: 2000000
        },
        {
          id: '0x3f28d8be756f4bd7814b55a3ff89d5ce',
          name: 'ESA',
          position: 2,
          prediction: {
            id: '0x9f35f71610a4f748203fb20941cd881e83ac490b'
          },
          probability: 15,
          profit: 130,
          stake: 2000000
        },
        {
          id: '0x338e8e790e2e4d509c7adc17e60c16f7',
          name: 'JAXA',
          position: 3,
          prediction: {
            id: '0x9f35f71610a4f748203fb20941cd881e83ac490b'
          },
          probability: 35,
          profit: 130,
          stake: 2000000
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
  .outcome.card {
    margin-bottom: 2rem;
  }

</style>
