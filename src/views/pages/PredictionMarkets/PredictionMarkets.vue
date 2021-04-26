<template>
  <div class="p-d-flex p-flex-column p-ai-stretch">

    <Heading name="Prediction Markets" level="1" class="p-mt-3"></Heading>

    <div class="p-d-flex p-ai-center p-jc-between">
      <div></div>
      <ToggleViewButton></ToggleViewButton>
    </div>

    <flex-col>
      <Stepstone :stepstone="step"></Stepstone>
    </flex-col>

  </div>

</template>

<script>
import Stepstone from '@/views/pages/PredictionMarkets/components/Stepstone'
export default {
  name: 'PredictionMarkets',
  components: {
    Stepstone
  },
  data: function () {
    return {
      step: {
        index: '1',
        name: 'Preparing for Mars',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    }
  }
}
</script>

<style scoped>

</style>
