<template>
  <div id="nav" class="p-menubar p-d-flex">
    <router-link to="/home" class="p-menuitem p-d-inline-block" :class="{'active': $route.path.includes('/home')}">Prediction markets</router-link>
    <router-link to="/home" class="p-menuitem p-d-inline-block" :class="{'active': $route.path.includes('/home')}">About Mars Economy</router-link>
    <router-link to="/about" class="p-menuitem p-d-inline-block">Convert mars milestones</router-link>
  </div>
</template>

<script>
export default {
  name: 'HeaderMenu'
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
