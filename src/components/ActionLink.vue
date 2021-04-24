<template>
  <div class="p-d-inline-flex p-ai-center action-link clickable">
    <span>{{label}}</span>
  </div>

</template>

<script>
export default {
  name: 'ActionLink',
  props: {
    label: String,
    icon: String
  }
}
</script>

<style scoped lang="scss">
  .action-link {
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.01em;
    text-transform: uppercase;
  }
</style>
