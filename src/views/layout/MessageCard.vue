<template>
  <div class="message-card p-mx-auto p-mt-5">
    <div class="h2 p-mb-3" v-if="header">{{ header }}</div>
    <div class="p-mt-2 p-mb-3" v-if="text">{{ text }}</div>
    <Button :label="buttonName"
            class="btn-primary p-mx-auto p-mt-2"
            @click="$emit('click')"/>
  </div>
</template>

<script>
export default {
  name: 'MessageCard',
  props: {
    header: String,
    text: String,
    buttonName: String
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

</style>
