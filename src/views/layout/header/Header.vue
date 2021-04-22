<template>
<header class="d-flex">

  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>

</header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped lang="scss">
  header {
    height: 80px;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: rgba($white, 0.03);
    border-bottom: 1px solid rgba($white, 0.03);
    box-sizing: border-box;
    backdrop-filter: blur(20px);

  }

</style>
