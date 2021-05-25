<template>
  <footer class="p-d-flex p-jc-between p-ai-center">
    <div class="footer-item">
      &copy; Mars Economy 2021
    </div>
    <div class="footer-item">
      <SocialIcons></SocialIcons>
    </div>

  </footer>

</template>

<script>
import SocialIcons from '@/views/layout/footer/SocialIcons'
export default {
  name: 'Footer',
  components: {
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
.footer-item {
  opacity: 0.5;
}

</style>
