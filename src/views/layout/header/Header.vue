<template>
<header class="p-d-flex p-ai-center" :class="{'mobile' : isMobile}">
  <div class="header-item p-d-none p-d-md-flex">
    <Logo></Logo>
  </div>
  <div class="menu-container p-d-flex p-ai-center p-ml-auto" :class="{'collapsed' : isMobile}">
    <div class="header-item p-mr-4">
      <HeaderMenu></HeaderMenu>
    </div>
    <div class="header-item">
      <Wallet :isMobile="isMobile"></Wallet>
    </div>
  </div>
  <div class="menu-trigger clickable" @click="onMenuToggle" v-if="isMobile">
    <div class="p-d-inline-flex pi pi-bars" v-if="!isMenuOpen"></div>
    <div class="p-d-inline-flex pi pi-times" v-else></div>
  </div>
</header>
</template>

<script>
import Logo from '@/views/layout/header/Logo'
import HeaderMenu from '@/views/layout/header/HeaderMenu'
import Wallet from '@/views/layout/header/Wallet/WalletButton'
export default {
  name: 'Header',
  components: {
    Wallet,
    HeaderMenu,
    Logo
  },
  props: {
    isMobile: Boolean
  },
  data: function () {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    onMenuToggle: function () {
      if (this.isMobile) {
        this.isMenuOpen = !this.isMenuOpen
        const elem = document.querySelector('.menu-container')
        elem.classList.toggle('collapsed')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  header {
    box-sizing: border-box;
    position: fixed;
    z-index: 1000;
    &:not(.mobile) {
      height: 80px;
      right: 0;
      top: 0;
      left: 0;
      font-size: 0.75rem;
      line-height: 1.3em;
      padding: 1rem 2rem;
      background-color: rgba($white, 0.03);
      border-bottom: 1px solid rgba($white, 0.03);
      backdrop-filter: blur(20px);
    }
  }
  header.mobile {
    top: 20px;
    right: 24px;
    .menu-container {
      position: absolute;
      width: 100vw;
      right: -24px;
      top: 20px;
      height: calc(100vh - 20px);
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      background-image: url("/images/bg-mobile.png");
      background-size: cover;
      transition: all 0.3s;

      .header-item {
        padding: 24px;
      }
    }
    .menu-container.collapsed {
      height: 0;
      overflow: hidden;
    }
  }
</style>
