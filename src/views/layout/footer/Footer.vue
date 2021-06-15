<template>
  <footer class="p-d-flex p-jc-between p-ai-center">
    <div class="p-d-flex p-ai-center footer-content">
      <div class="footer-item">
        &copy; Mars Economy 2021
      </div>
      <Disclaimer :is-mobile="isMobile"></Disclaimer>
    </div>
    <div v-if="!isMobile" class="footer-item">
      <SocialIcons></SocialIcons>
    </div>
  </footer>
</template>

<script>
import SocialIcons from '@/views/layout/footer/SocialIcons'
import Disclaimer from '@/views/layout/footer/Disclaimer'

export default {
  name: 'Footer',
  props: {
    isMobile: Boolean
  },
  components: {
    Disclaimer,
    SocialIcons
  }
}
</script>

<style scoped lang="scss">
  footer {
    height: 48px;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 0.75rem;
    line-height: 1.3em;
    padding: 1rem 2rem;
    background-color: rgba($black, 0.05);
    border-bottom: 1px solid rgba($white, 0.03);
    backdrop-filter: blur(20px);
  }

  .footer-content {
    .footer-item {
      opacity: 0.5;
      margin: 0 20px;
    }

    & > :first-child {
      margin-left: 0;
    }
  }

</style>
