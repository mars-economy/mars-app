<template>
  <div class="current-order p-py-3">
    <CardLabel label="current order" labelPos="right" v-if="!isStakeSuccess" />
    <CardLabel label="your stake" labelPos="right" color="primary" v-else />

    <TextPair data="10 BUSD" label="your total stake" icon="coins" class="p-mt-2" :color="isStakeSuccess ? 'primary' : null" />
    <TextPair data="13 BUSD" label="total estimated win" icon="win" class="p-mt-2" :color="isStakeSuccess ? 'primary' : null" />

    <Divider type="solid" class="p-my-3"/>

    <template v-if="isShow">
      <StakeInput></StakeInput>
      <Button label="Place a stake" class="btn-primary btn-block p-my-2" />
      <InfoMessage text="You don’t have enough tokens in your wallet" type="warning" color="primary" small />
    </template>
    <template v-if="isShow">
      <Loader message="We are checking your wallet. Please wait for a moment" class="p-mt-3"/>
    </template>

  </div>

</template>

<script>
import StakeInput from '@/views/pages/Milestone/components/stake/StakeInput'
export default {
  name: 'Order',
  components: {
    StakeInput
  },
  data: function () {
    return {
      isStakeSuccess: false,
      isShow: true
    }
  }
}
</script>

<style scoped lang="scss">
  .current-order {
    position: relative;
    @extend %card-px;
  }

</style>
