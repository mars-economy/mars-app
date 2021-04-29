<template>
  <div class="p-d-flex p-ai-center">
    <div class="p-mr-2">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34 22C34 30.8366 26.8366 38 18 38C9.16344 38 2 30.8366 2 22C2 13.1634 9.16344 6 18 6" stroke="#FFC22E" stroke-opacity="0.1" stroke-width="3"/>
        <g filter="url(#filter0_d)">
          <path d="M34 22C34 13.1634 26.8366 6 18 6" stroke="#FFC22E" stroke-width="3"/>
        </g>
        <defs>
          <filter id="filter0_d" x="14" y="0.5" width="25.5" height="25.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="2"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.760784 0 0 0 0 0.180392 0 0 0 0.3 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
          </filter>
        </defs>
      </svg>
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

<style scoped>

</style>
