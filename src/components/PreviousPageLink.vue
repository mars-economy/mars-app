<template>
  <div class="p-d-inline-flex p-ai-center text-smallest muted clickable" @click="goToBack()">
    <span class="pi pi-angle-left p-mr-1"></span>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'PreviousPageLink',
  props: {
    text: String,
    url: String
  },
  methods: {
    goToBack () {
      if (this.url) {
        this.$router.push(this.url)
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped>
  .muted.clickable:hover {
    opacity: 1;
  }

</style>
