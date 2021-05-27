<template>
  <div class="message-card p-mx-auto p-mt-5" :class="type">
    <template v-if="type === 'wrong-network'">
      <InfoMessage type="warning" color="primary" text="Wrong network" :large="!isMobile" />
      <div class="p-my-3">
        Only BSC and BSC testnet are supported.
      </div>
      <div>
        Please change the network in your wallet.
      </div>

    </template>
    <template v-else>
      <div class="h2 p-mb-3" v-if="header">{{ header }}</div>
      <div class="p-mt-2 p-mb-3" v-if="text">{{ text }}</div>
      <Button :label="buttonName"
              class="btn-primary p-mx-auto p-mt-2"
              @click="$emit('click')"/>
    </template>

  </div>
</template>

<script>
export default {
  name: 'MessageCard',
  props: {
    type: String,
    header: String,
    text: String,
    buttonName: String,
    isMobile: Boolean
  }
}
</script>

<style scoped lang="scss">
  .message-card {
    background: rgba($white, 0.02);
    border: $border-light;
    backdrop-filter: blur(20px);
    border-radius: $radius-base;
    padding: 40px;
    text-align: center;
  }
  .wrong-network {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
