import { mapActions } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { PHASES_ACTION_TYPES } from '@/store/modules/phases/phases.module'

const GQL_REQUEST_TIMEOUT = 5000

const apolloMixins = {
  data: function () {
    return {
      apolloIntervalId: null
    }
  },
  async mounted () {
    await this.getAllData()
    this.apolloIntervalId = setInterval(async () => {
      // await this.getAllData()
    }, GQL_REQUEST_TIMEOUT)
  },
  unmounted () {
    clearInterval(this.apolloIntervalId)
  },
  methods: {
    ...mapActions(MODULE_NAMES.PHASES, {
      getAllData: PHASES_ACTION_TYPES.GET_DATA
    })
  }
}

export default apolloMixins
