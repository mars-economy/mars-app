<template>
  <div class="pair p-d-inline-flex p-ai-center">
    <Icon class="pair-icon p-mr-1" v-if="icon" :name="icon" :class="{'icon-primary': color  }"></Icon>
    <div class="pair-data" :class="{ 'text-primary': color }">{{data}}</div>
    <div class="pair-label p-ml-2 muted" v-if="label" :class="{'text-primary' : color }">{{label}}</div>
  </div>

</template>

<script>
export default {
  name: 'TextPair',
  props: {
    label: String,
    data: [String, Number],
    icon: String,
    color: String
  }
}
</script>

<style scoped lang="scss">
  .pair {
    font-size: 14px;
    line-height: 1em;
    letter-spacing: -0.02em;
  }
  .pair-data {
    font-weight: 700;
  }
</style>
