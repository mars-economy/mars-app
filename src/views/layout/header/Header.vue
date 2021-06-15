<template>
  <header :class="{'mobile' : isMobile}" class="p-d-flex p-ai-center">
    <div class="header-item p-d-none p-d-sm-flex">
      <Logo></Logo>
    </div>
    <div :class="{'collapsed' : !isMenuOpen}" class="menu-container p-d-flex p-ai-center p-ml-auto">
      <div v-if="isMobile">
        <Logo class="headline"></Logo>
      </div>
      <div class="header-item p-mr-4">
        <HeaderMenu :isMobile="isMobile" @click="isMenuOpen=false"></HeaderMenu>
      </div>
      <div class="header-item">
        <Wallet :isMobile="isMobile"></Wallet>
      </div>
      <template v-if="isMobile">
        <div class="header-item p-mt-auto w-100">
          <SocialIcons></SocialIcons>
        </div>
        <Footer :is-mobile="isMobile"></Footer>
      </template>
    </div>
    <div v-if="isMobile" class="menu-trigger clickable" @click="onMenuToggle">
      <div v-if="!isMenuOpen" class="p-d-inline-flex pi pi-bars"></div>
      <div v-else class="p-d-inline-flex pi pi-times"></div>
    </div>
  </header>
</template>

<script>
import Logo from '@/views/layout/header/Logo'
import HeaderMenu from '@/views/layout/header/HeaderMenu'
import Wallet from '@/views/layout/header/Wallet/WalletButton'
import SocialIcons from '../footer/SocialIcons'
import Footer from '@/views/layout/footer/Footer'

export default {
  name: 'Header',
  components: {
    Footer,
    SocialIcons,
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
    right: 0;
    top: 0;
    left: 0;

    &:not(.mobile) {
      height: 60px;
      font-size: 0.75rem;
      line-height: 1.3em;
      padding: 1rem 2rem;
      background-color: rgba($black, 0.05);
      border-bottom: 1px solid rgba($white, 0.03);
      backdrop-filter: blur(20px);
    }
  }

  header.mobile {
    height: 60px;

    .menu-trigger {
      position: absolute;
      right: 24px;
      top: 20px;
      z-index: 9999;
    }

    .menu-container {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 100vh;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      background-image: url("/images/bg-mobile.png");
      background-size: cover;
      transition: all 0.3s;

      .headline {
        margin: 20px 24px 0;
      }

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
