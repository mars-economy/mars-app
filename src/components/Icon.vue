<template>
  <div class="icon p-b-inline-flex p-jc-center p-ai-center"
       :style="[size ? {width: size+'px', height: size+'px'} : {width: '20px', height: '20px'}]"
       v-html="getIconSvg(name)">
  </div>

</template>

<script>
import { ICONS } from '@/constants/icons'

export default {
  name: 'Icon',
  props: {
    name: String,
    size: String
  },
  methods: {
    getIconSvg (name) {
      return ICONS[name]
    }
  }
}
</script>

<style scoped>

</style>
