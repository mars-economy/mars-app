<template>
  <div id="nav" class="p-menubar p-d-flex">
    <router-link :class="{'active': $route.path.includes('/')}" class="p-menuitem p-d-inline-block" to="/">Prediction
      markets
    </router-link>
    <a :href="navigateToLanding" class="p-menuitem p-d-inline-block" target="_blank">About Mars Economy</a>
    <!--    <router-link to="/about" class="p-menuitem p-d-inline-block">Convert mars milestones</router-link>-->
  </div>
</template>

<script>
export default {
  name: 'HeaderMenu',
  computed: {
    navigateToLanding () {
      return process.env.VUE_APP_MARS_LANDING
    }
  }
}
</script>

<style scoped lang="scss">

  .p-menuitem {
    opacity: 0.5;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: $textColor;
    text-decoration: none;
    margin: auto 1rem;

    &:hover {
      opacity: 1;
    }
  }

</style>
