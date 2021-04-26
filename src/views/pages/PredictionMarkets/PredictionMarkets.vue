<template>
  <div class="p-d-flex p-flex-column p-ai-stretch">

    <Heading name="Prediction Markets" level="1" class="p-my-3" />

    <div class="p-d-flex p-ai-center p-jc-between p-mt-1 p-my-3">
      <div class="p-mx-auto">
        <SelectButton v-model="option" :options="options" class="btn-select"/>
      </div>
      <ToggleViewButton />
    </div>

    <div class="p-d-flex p-flex-column">
      <Stepstone :stepstone="step" />
    </div>
    <Divider type="dashed" />

  </div>

</template>

<script>
import SelectButton from 'primevue/selectbutton'
import Stepstone from '@/views/pages/PredictionMarkets/components/Stepstone'

export default {
  name: 'PredictionMarkets',
  components: {
    Stepstone,
    SelectButton
  },
  data: function () {
    return {
      step: {
        index: '1',
        name: 'Preparing for Mars',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      option: 'current',
      options: ['current', 'historical']
    }
  }
}
</script>

<style scoped>
  .btn-select {
    transform: translateX(64px);
  }

</style>
