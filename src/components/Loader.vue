<template>
  <div class="p-d-flex p-ai-center">
    <div class="p-mr-2">
      <div class="spinner">
        <svg class="spinner-svg" viewBox="25 25 50 50">
          <circle class="spinner-circle" cx="50" cy="50" r="20" fill="none" stroke-width="3px" strokeMiterlimit="10" />
          <circle cx="50" cy="50" r="20" stroke="#FFC22E1A" stroke-width="3px" opacity="0.7" fill="none"/>
        </svg>
      </div>
  </div>
    <div class="text-primary text-small">
      {{message}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    message: String
  }
}
</script>

<style scoped lang="scss">
.spinner {
  position: relative;
  margin: 0 auto;
  width: 35px;
  height: 35px;
  display: inline-block;
}
.spinner::before {
  content: '';
  display: block;
  padding-top: 100%;
}
.spinner-svg {
  animation: spinner-rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.spinner-circle {
  stroke-dasharray: 89, 200;
  stroke-dashoffset: 0;
  stroke: $colorPrimary;
  animation: spinner-dash 3s ease-in-out infinite;
  stroke-linecap: round;
}
@keyframes spinner-rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spinner-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
