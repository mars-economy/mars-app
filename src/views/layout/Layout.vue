<template>
  <div class="d-flex flex-column">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/views/layout/header/Header.vue'

export default {
  name: 'Layout',
  components: {
    Header
  }
}
</script>

<style scoped>

</style>
