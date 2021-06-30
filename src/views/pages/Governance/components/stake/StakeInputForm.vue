<template>
  <div class="stake-input">
    <div class="p-d-sm-flex p-jc-between p-ai-end">

      <div class="p-d-flex p-flex-column w-100 p-mr-1">
        <div class="p-d-flex p-jc-between p-ai-center p-mb-2">
          <div class="text-smallest muted">your stake</div>
          <div class="text-smallest"><span class="muted p-mr-1">balance</span>123456789 BUSD</div>
        </div>
        <div class="p-d-flex p-jc-between p-ai-center p-mb-2">
          <div class="p-inputgroup">
            <input placeholder="0">
            <span class="p-inputgroup-addon btn-inputgroup-addon muted p-mr-2 clickable">max</span>
            <span class="p-inputgroup-addon muted">$DMT</span>
          </div>
        </div>
      </div>
      <div class="p-ml-sm-2 p-mb-2">
        <Button label="stake $DMT" class="btn-primary btn-block"/>
      </div>

    </div>
    <div>
      <InfoMessage type="warning" text="You don’t have enough tokens in your wallet" color="primary" small/>
    </div>
  </div>
</template>

<script>
import { convertFromWei } from '@/utils/contract'

export default {
  name: 'StakeInputForm',
  props: {
    data: Object
  },
  methods: {
    fromWei (amount) {
      return convertFromWei(amount)
    },
    handlePutMax ($event) {
      const val = this.fromWei(this.$store.state.wallet.balanceBUSD)
      this.$refs['input-balance-' + this.data.id].value = val
      this.$emit('update:stake', val.toString())
    }
  }

}
</script>

<style scoped>

</style>
