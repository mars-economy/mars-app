<template>
  <div class="p-d-flex">
    <span v-for="(social, index) in socials" :key="index">
      <a :href="social.link" class="p-ml-4" v-html="icons[social.name.toLowerCase()]"></a>
    </span>
  </div>

</template>

<script>
import { ICONS } from '@/constants/socialIcons'

export default {
  name: 'SocialLink',
  data: function () {
    return {
      icons: ICONS,
      socials: [
        { name: 'GitHub', link: '' },
        { name: 'Twitter', link: '' },
        { name: 'mail', link: '' },
        { name: 'Telegram', link: '' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
