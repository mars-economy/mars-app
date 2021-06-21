<template>
  <div class="prediction-list p-d-flex p-flex-column fx-grow">
    <template v-for="(prediction, index) in predictions" :key="index">
      <Prediction :prediction="prediction"
                  :isMobile="isMobile"
                  :class="[{'p-mt-2' : index !== 0}]"/>
    </template>
  </div>

</template>

<script>
import Prediction from '@/views/pages/Milestone/components/Prediction'
import { mapActions } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { CONTRACTS_ACTION_TYPES } from '@/store/modules/contracts/contracts.module'

export default {
  name: 'PredictionList',
  components: {
    Prediction
  },
  props: {
    predictions: Array,
    isMobile: Boolean
  },
  watch: {
    '$store.state.wallet.isInjected': {
      handler: async function (val) {
        if (val) {
          for (const item of this.predictions) {
            item.stakes = await this.getUserStakes({ prediction: item }) || null
          }
        }
      },
      immediate: true
    },
    predictions: {
      handler: async function (val) {
        console.debug('detect changes predictions')
        if (!this.$store.state.wallet.isInjected) return
        if (val) {
          for (const item of this.predictions) {
            item.stakes = await this.getUserStakes({ prediction: item }) || null
            item.meta = await this.getPredictionMeta({ prediction: item }) || null
            console.log(item.meta)
          }
        }
      },
      // deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions(MODULE_NAMES.CONTRACTS, {
      getUserStakes: CONTRACTS_ACTION_TYPES.GET_USER_STAKES,
      getPredictionMeta: CONTRACTS_ACTION_TYPES.GET_PREDICTION_META
    })
  }
}
</script>

<style scoped>

</style>
