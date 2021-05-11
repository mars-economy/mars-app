<template>
  <div class="pair p-d-inline-flex p-ai-center">
    <Icon class="pair-icon p-mr-1" v-if="icon" :name="icon" :class="{'icon-primary': color  }"></Icon>
    <div :class="{ 'text-primary': color }" class="pair-data">{{ prepareData(data) }} {{ unit }}</div>
    <div v-if="label" :class="{'text-primary' : color }" class="pair-label p-ml-2 muted">{{ label }}</div>
  </div>

</template>

<script>
import { mathRound } from '@/utils/math.ts'

export default {
  name: 'TextPair',
  props: {
    label: String,
    data: [String, Number],
    unit: String,
    icon: String,
    color: String
  },
  methods: {
    prepareData (data) {
      return this.unit ? mathRound(data) : data
    }
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
    white-space: nowrap;
  }
</style>
