<template>
  <div class="stake-input">
    <div v-if="$store.state.wallet.balanceBUSD !== null" class="p-d-flex p-jc-between p-ai-center p-mb-2">
      <div class="text-smallest muted">your stake</div>
      <div class="text-smallest"><span class="muted p-mr-1">balance</span>{{ fromWei($store.state.wallet.balanceBUSD) }}
        BUSD
      </div>
    </div>
    <div class="p-inputgroup">
      <input :ref="'input-balance-'+outcome.id"  placeholder="0"
             v-on:input="$emit('update:stake', +$event.target.value)">
      <span class="p-inputgroup-addon btn-inputgroup-addon muted p-mr-2 clickable"
            v-on:click="handlePutMax($event)">max</span>
      <span class="p-inputgroup-addon muted">BUSD</span>
    </div>
  </div>
</template>

<script>
import { convertFromWei } from '@/utils/contract'

export default {
  name: 'StakeInput',
  props: {
    outcome: Object
  },
  methods: {
    fromWei (amount) {
      return convertFromWei(amount)
    },
    handlePutMax ($event) {
      const val = this.fromWei(this.$store.state.wallet.balanceBUSD)
      this.$refs['input-balance-' + this.outcome.id].value = val
      this.$emit('update:stake', val.toString())
    }
  }
}
</script>

<style scoped lang="scss">

</style>
