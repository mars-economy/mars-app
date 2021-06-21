<template>
  <div id="nav" class="p-menubar p-d-flex p-flex-column p-flex-sm-row" :class="{'mobile' : isMobile}">
    <div :class="{'active': $route.path.includes('/prediction-markets')}"
                 class="p-menuitem p-d-inline-block"
                 @click="$router.push('/'); $emit('click')">
      Prediction markets
    </div>
    <div :class="{'active': $route.path.includes('/governance')}"
         class="p-menuitem p-d-inline-block"
         @click="$router.push('/governance'); $emit('click')">
      Governance
    </div>
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
  },
  props: {
    isMobile: Boolean
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
    font-weight: 700;
    cursor: pointer;

    &:hover, &.active {
      opacity: 1;
    }
  }
  .p-menubar.mobile {
    .p-menuitem {
      margin: 20px 0 0 0;
      font-size: 12px;
      line-height: 16px;
    }
  }
</style>
