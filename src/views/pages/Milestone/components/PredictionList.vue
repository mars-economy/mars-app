<template>
  <div class="prediction-list p-d-flex p-flex-column fx-grow">
    <template v-for="(prediction, index) in predictions" :key="index">
      <Prediction :prediction="prediction"/>
    </template>
  </div>

</template>

<script>
import Prediction from '@/views/pages/Milestone/components/Prediction'

export default {
  name: 'PredictionList',
  components: {
    Prediction
  },
  props: {
    predictions: Array
  }
}
</script>

<style scoped>

</style>
