<template>
  <div class="stake-input">
    <div v-if="$store.state.wallet.balanceBUSD !== null" class="p-d-flex p-jc-between p-ai-center p-mb-2">
      <div class="text-smallest muted">your stake</div>
      <div class="text-smallest"><span class="muted p-mr-1">balance</span>{{ fromWei($store.state.wallet.balanceBUSD) }}
        BUSD
      </div>
    </div>
    <div class="p-inputgroup">
      <input :ref="'input-balance-'+outcome.id" class="fx-grow" placeholder="0"
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

  .p-inputgroup {
    background: rgba($white, 0.05);
    border: 1px solid rgba($white, 0.1);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    min-height: 40px;
    font-family: $font-family-base;
    font-size: $font-size-small;
    color: $white;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: $radius-base;

    input {
      background: none !important;
      border: none !important;
      font-family: $font-family-base;
      font-size: $font-size-small;
      color: $white;

      &::placeholder {
        color: $white
      }
    }

    .btn-inputgroup-addon {
      padding: 2px 4px;
      background-color: rgba($white, 0.1);
      border-radius: 4px;
      text-transform: uppercase;

      &:hover {
        background-color: rgba($white, 0.3)
      }
    }
  }

</style>
