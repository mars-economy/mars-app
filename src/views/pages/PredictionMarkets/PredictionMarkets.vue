<template>
  <div class="p-d-flex p-flex-column p-ai-stretch" :class="{'mobile' : isMobile}">

    <Heading v-if="!isMobile" class="p-my-3" level="1" name="Prediction Markets"/>
    <div class="headline" v-else>
      Prediction Markets
    </div>

    <div class="p-grid p-ai-center p-mt-1 p-my-3">
      <div class="p-mb-2 p-mb-lg-0 p-col-12 p-lg-4 p-lg-offset-4 p-d-flex p-ai-center p-jc-center">
        <SelectButton v-model="option" :options="options" class="btn-select p-mx-auto" v-on:select="option = $event"/>
      </div>
      <!--
      <ToggleViewButton/>
      -->
      <!--            <Divider type="dashed" v-if="isMobile" />-->

      <!--      <div class="p-col-12 p-lg-4 p-ai-center switch p-mt-3 p-mt-lg-0 p-d-flex p-ai-center p-jc-lg-end p-jc-center">-->
      <!--        <span class="p-mr-2 clickable" :class="{'checked' : !showMine}" @click="showMine = false">-->
      <!--          show all predictions</span>-->
      <!--        <InputSwitch v-model="showMine"></InputSwitch>-->
      <!--        <span class="p-ml-2 clickable" :class="{'checked' : showMine}" @click="showMine = true">-->
      <!--          only mine</span>-->
      <!--      </div>-->

    </div>
    <Divider v-if="isMobile" type="dashed"/>

    <template v-if="!dataEmpty">
      <template v-for="(category, index) in phases" :key="index">
        <div class="p-d-flex p-flex-column p-my-0 p-my-sm-3">
          <Stepstone :isMobile="isMobile" :status="option" :stepstone="category"/>
        </div>
        <Divider v-if="(phases.length - 1) !== index && !isMobile" type="dashed" class="p-my-md-3"/>
      </template>
    </template>
    <template v-else>
      <MessageCard header="There is no historical prediction market yet"
                   text="Choose current prediction market and stake on it."
                   button-name="show current predictions"
                   @click="option = 'current'" />
    </template>

  </div>

</template>

<script>
import SelectButton from 'primevue/selectbutton'
// import InputSwitch from 'primevue/inputswitch'
import Stepstone from '@/views/pages/PredictionMarkets/components/Stepstone'
import { mapState } from 'vuex'
import { MODULE_NAMES } from '@/store'
import MessageCard from '../../layout/MessageCard'

export default {
  name: 'PredictionMarkets',
  components: {
    MessageCard,
    // InputSwitch,
    Stepstone,
    SelectButton
  },
  props: {
    isMobile: Boolean
  },
  watch: {
    option: function (val) {
      console.debug(val)
    },
    showMine: function (val) {
      console.debug(val)
    }
  },
  data: function () {
    return {
      option: 'current',
      options: ['current', 'historical'],
      showMine: false,
      dataEmpty: false
    }
  },
  computed: {
    ...mapState(MODULE_NAMES.PHASES, {
      phases (state) {
        if (Object.keys(state.phases).length === 0) return []
        return state.phases.nodes
          .filter(item => item.nodeType === 'categories')
      }
    })
  }
}
</script>

<style scoped>

</style>
