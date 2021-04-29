<template>
  <div class="stake-input">
      <div class="p-d-flex p-jc-between p-ai-center p-mb-2">
        <div class="text-smallest muted">your stake</div>
        <div class="text-smallest"><span class="muted p-mr-1">balance</span>13.12345 BUSD</div>
      </div>
        <div class="p-inputgroup">
          <input placeholder="0" class="fx-grow">
          <span class="p-inputgroup-addon btn-inputgroup-addon muted p-mr-2 clickable">max</span>
          <span class="p-inputgroup-addon muted">BUSD</span>
        </div>
  </div>
</template>

<script>
export default {
  name: 'StakeInput'
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
      &::placeholder { color: $white }
    }
    .btn-inputgroup-addon {
      padding: 2px 4px;
      background-color: rgba($white, 0.1);
      border-radius: 4px;
      text-transform: uppercase;
      &:hover { background-color: rgba($white, 0.3) }
    }
  }

</style>
