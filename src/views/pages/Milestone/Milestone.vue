<template>
  <div :class="{'mobile' : isMobile}">
    <div v-if="isMobile" class="headline">
      Predictions
    </div>
    <PreviousPageLink class="p-mb-sm-4 p-mt-4 p-mt-sm-0" text="Back to the list of Milestones" url="/" />

    <div v-if="Object.keys(milestone).length > 0" class="p-grid p-mt-3 p-mt-lg-0">
      <div class="milestone-description p-pr-md-6 p-col-12 p-lg-4">
        <Label :labels="['phase '+milestone.getParent().position, milestone.getParent().name]" class=" p-mb-3"/>
        <Heading :name="milestone.name" class="p-my-1" level="2"/>
        <div>
          <TextPair :data="prepareDate(milestone.getChildrenList()[0]?.dueDate || null)"
                    class="p-my-4"
                    icon="date"
                    label="due date"/>
        </div>
        <div>
          <TextPair :data="getMilestonePredictorNumber(milestone)" icon="users" label="predictors"/>
        </div>
        <div class="p-mt-lg-3 text-body">{{ milestone.description }}</div>
      </div>
      <div class="prediction-list-container p-col-12 p-lg-8">
        <PredictionList :isMobile="isMobile" :predictions="milestone.getChildrenList('asc')"/>
      </div>
    </div>
  </div>
</template>

<script>
import PredictionList from '@/views/pages/Milestone/components/PredictionList'
import { mapActions, mapState } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { WALLET_ACTION_TYPES } from '@/store/modules/wallet/wallet.module'
import { getFormattedData } from '@/helpers/date.helper'

export default {
  name: 'Milestone',
  components: {
    PredictionList
  },
  props: {
    isMobile: Boolean
  },
  data: function () {
    return {
      milestoneUuid: null
    }
  },
  watch: {
    $route: {
      handler: async function (route) {
        if (route.params.id) {
          this.milestoneUuid = route.params.id
        }
      },
      immediate: true
    },
    '$store.state.wallet.isInjected': {
      handler: async function (val) {
        if (val) {
          this.getWalletBalances(this.$store.state.phases.predictions[0].token)
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(MODULE_NAMES.WALLET, {
      getWalletBalances: WALLET_ACTION_TYPES.GET_WALLET_BALANCES
    }),
    prepareDate (timeS) {
      return getFormattedData(timeS)
    },
    getMilestonePredictorNumber (milestone) {
      let pNumbers = 0
      milestone.getChildrenList('asc').forEach(p => {
        pNumbers += +p.predictorsNumber
      })
      return pNumbers
    }
  },
  computed: {
    ...mapState(MODULE_NAMES.PHASES, {
      milestone (state) {
        let milestone = {}
        if (!this.milestoneUuid) return milestone
        milestone = state.phases.nodes
          ? state.phases.nodes.find(item => item.nodeType === 'milestones' && item.id === this.milestoneUuid)
          : {}
        return milestone
      }
    })
  }
}
</script>

<style scoped lang="scss">

</style>
