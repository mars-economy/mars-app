<template>
  <div>
    <Header></Header>
    <div class="main-container container-lg">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/views/layout/header/Header.vue'
import Footer from '@/views/layout/footer/Footer'

export default {
  name: 'Layout',
  components: {
    Footer,
    Header
  }
}
</script>

<style scoped lang="scss">
  .main-container {
    margin: 80px auto 60px auto;
    max-width: 1168px;
    padding: 2rem 1rem;

  }
</style>
