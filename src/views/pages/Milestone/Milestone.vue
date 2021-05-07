<template>
  <div>
    <PreviousPageLink class="p-mb-4" text="Back to the list of Milestones"/>
    <div v-if="Object.keys(milestone).length > 0" class="p-d-flex p-jc-between">
      <div class="milestone-description">
        <Label :labels="['stepstone '+milestone.getParent().position, milestone.getParent().name]" class=" p-mb-3"/>
        <Heading :name="milestone.name" class="p-my-1" level="2"/>
        <TextPair :data="milestone.status" label="current state" icon="state" class="p-my-3"></TextPair>
        <div class="p-mt-3 text-body">{{ milestone.description }}</div>
      </div>
      <div class="prediction-list-container">
        <PredictionList :predictions="milestone.getChildrenList()"/>
      </div>
    </div>
  </div>
</template>

<script>
import PredictionList from '@/views/pages/Milestone/components/PredictionList'
import { mapActions, mapState } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { WALLET_ACTION_TYPES } from '@/store/modules/wallet/wallet.module'

export default {
  name: 'Milestone',
  components: {
    PredictionList
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
    })
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
  .milestone-description {
    width: 31%;
  }

  .prediction-list-container {
    width: 66%;
  }

</style>
