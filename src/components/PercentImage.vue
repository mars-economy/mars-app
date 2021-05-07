<template>
  <div>
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle stroke-dasharray="1,3" r="15" cy="17.5" cx="17.5" fill="none"/>
      <circle :style="{'stroke-dasharray':getStyle()}" id="marker" r="15" cy="17.5" cx="17.5" stroke-width="3" fill="none"/>
      <path d="M12.2002 17.5886L16.5888 22.5257L21.8002 13.2" stroke="#FFC22E" stroke-width="2"/>
    </svg>
  </div>

</template>

<script>
export default {
  name: 'PercentImage',
  props: {
    value: [Number, String],
  },
  methods: {
    getStyle () {
      const path = Math.PI * 30
      const dash = this.value * path * 0.01
      return dash + ',' + (path - dash)
    }
  }
}
</script>

<style scoped lang="scss">
  circle {
    stroke: $colorPrimary;
    stroke-linecap: butt;
  }
  #marker {
    transform: rotate(-90deg);
    transform-origin: center;
  }

</style>
