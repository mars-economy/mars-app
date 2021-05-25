import { mapActions } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { PHASES_ACTION_TYPES } from '@/store/modules/phases/phases.module'
import { CONTRACTS_ACTION_TYPES } from '@/store/modules/contracts/contracts.module'

const GQL_REQUEST_TIMEOUT = 5000

const apolloMixins = {
  data: function () {
    return {
      apolloIntervalId: null
    }
  },
  async mounted () {
    if (process.env.VUE_APP_DATA_SOURCE === 'graphql') {
      await this.getAllData()
    }
    // for (const item of this.$store.state.phases.predictions) {
    //   item.stakes = await this.getUserStakes({ prediction: item }) || null
    // }
    // this.apolloIntervalId = setInterval(async () => {
    //   // await this.getAllData()
    // }, GQL_REQUEST_TIMEOUT)
  },
  unmounted () {
    clearInterval(this.apolloIntervalId)
  },
  methods: {
    ...mapActions(MODULE_NAMES.PHASES, {
      getAllData: PHASES_ACTION_TYPES.GET_DATA
    }),
    ...mapActions(MODULE_NAMES.CONTRACTS, {
      getUserStakes: CONTRACTS_ACTION_TYPES.GET_USER_STAKES
    })
  }
}

export default apolloMixins
