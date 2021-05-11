<template>
  <div class="p-d-flex p-flex-column p-ai-stretch" :class="{'mobile' : isMobile}">

    <Heading v-if="!isMobile" class="p-my-3" level="1" name="Prediction Markets"/>
    <div class="headline" v-else>
      Prediction Markets
    </div>

    <div class="p-d-flex p-flex-column p-flex-sm-row p-ai-center p-jc-between p-mt-1 p-my-3">
      <div class="p-mx-auto">
        <SelectButton v-model="option" :options="options" class="btn-select" v-on:select="option = $event"/>
      </div>
      <!--
      <ToggleViewButton/>
      -->
      <Divider type="dashed" v-if="isMobile" class="p-my-3"/>

      <div class="p-d-inline-flex p-ai-center switch">
        <span class="p-mr-2 clickable" :class="{'checked' : !showMine}" @click="showMine = false">
          show all predictions</span>
        <InputSwitch v-model="showMine"></InputSwitch>
        <span class="p-ml-2 clickable" :class="{'checked' : showMine}" @click="showMine = true">
          only mine</span>
      </div>

    </div>
    <Divider v-if="isMobile" type="dashed"/>

    <template v-for="(category, index) in phases" :key="index">
      <div class="p-d-flex p-flex-column">
        <Stepstone :isMobile="isMobile" :status="option" :stepstone="category"/>
      </div>
      <Divider type="dashed" v-if="!isLastItem(index)"/>
    </template>

  </div>

</template>

<script>
import SelectButton from 'primevue/selectbutton'
import InputSwitch from 'primevue/inputswitch'
import Stepstone from '@/views/pages/PredictionMarkets/components/Stepstone'
import { mapState } from 'vuex'
import { MODULE_NAMES } from '@/store'

export default {
  name: 'PredictionMarkets',
  components: {
    InputSwitch,
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
      showMine: false
    }
  },
  methods: {
    isLastItem (index) {
      return index === this.categories.length - 1
    }
  },
  computed: {
    ...mapState(MODULE_NAMES.PHASES, {
      categories (state) {
        return state.categories
      },
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
  .btn-select {
    /* transform: translateX(64px); */
  }

</style>
