<template>
  <div>
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle stroke-dasharray="1,3" r="15" cy="17" cx="17" fill="none"/>
      <circle :style="{'stroke-dasharray':getStyle()}" id="marker" r="16" cy="17.58" cx="17" stroke-width="3" fill="none"/>
      <path d="M12.2002 17.5886L16.5888 22.5257L21.8002 13.2" stroke="#FFC22E" stroke-width="2"/>
    </svg>
  </div>

</template>

<script>
export default {
  name: 'PercentImage',
  props: {
    value: Number
  },
  methods: {
    getStyle () {
      const dash = 100 - this.value
      return this.value + ',' + dash
    }
  }
}
</script>

<style scoped lang="scss">
  circle {
    stroke: $colorPrimary;
  }
  #marker {
    transform: rotate(-90deg);
    transform-origin: center;
  }

</style>
