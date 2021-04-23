<template>
<header class="p-d-flex p-ai-center">
  <div class="header-item">
    <Logo></Logo>
  </div>
  <div class="header-item p-ml-auto p-mr-4">
    <HeaderMenu></HeaderMenu>
  </div>
  <div>
    <Wallet></Wallet>
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
  }
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
    font-size: 0.75rem;
    line-height: 1.3em;
    padding: 1rem 2rem;
    background-color: rgba($white, 0.03);
    border-bottom: 1px solid rgba($white, 0.03);
    backdrop-filter: blur(20px);
  }
</style>
