<template>
  <div class="p-d-flex p-ai-center text-small-base muted clickable" @click="goToBack()">
    <span class="pi pi-angle-left p-mr-1"></span>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'PreviousPageLink',
  props: {
    text: String
  },
  methods: {
    goToBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
