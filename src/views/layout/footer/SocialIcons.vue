<template>
  <div class="p-d-flex p-ai-center p-jc-between p-jc-md-end">
    <span v-for="(social, index) in socials"
          :key="index"
          @click="openExternalLink(social.link)"
          class="clickable muted">
      <span class="p-ml-md-5" v-html="icons[social.name.toLowerCase()]"></span>
    </span>
  </div>

</template>

<script>
import { ICONS } from '@/constants/socialIcons'

export default {
  name: 'SocialIcons',
  data: function () {
    return {
      icons: ICONS,
      socials: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/MarsEconomy'
        },
        {
          name: 'Telegram',
          link: 'https://t.me/marseconomy'
        },
        {
          name: 'Instagram',
          link: 'https://www.instagram.com/mars_economy/'
        },
        {
          name: 'Gitbook',
          link: 'https://mars-10.gitbook.io/mars/'
        },
        {
          name: 'GitHub',
          link: 'https://github.com/mars-economy'
        },
        {
          name: 'Reddit',
          link: 'https://www.reddit.com/r/MarsEconomy/'
        }
      ]
    }
  },
  methods: {
    openExternalLink (url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style scoped>

</style>
