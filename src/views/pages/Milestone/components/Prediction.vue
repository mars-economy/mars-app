<template>
  <div>
    <div class="prediction-name p-d-flex p-ai-center p-mb-4">
      <NumberCircle :number="prediction.position" class="p-mr-2"></NumberCircle>
      <span class="text-body p-ml-1">{{ prediction.name }}</span>
    </div>
    <div class="p-d-flex">
      <Outcome />
    </div>

  </div>

</template>

<script>
import NumberCircle from '@/components/NumberCircle'
import Outcome from '@/views/pages/Milestone/components/Outcome'
export default {
  name: 'Prediction',
  components: {
    Outcome,
    NumberCircle
  },
  props: {
    prediction: Object
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
