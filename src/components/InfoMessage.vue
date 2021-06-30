<template>
  <div class="p-d-inline-flex p-ai-center">
    <Icon :name="type" :class="getIconClass()" class="p-mr-2" :size="getIconSize()" />
    <span :class="getTextClass()" class="p-text-sm-nowrap">
      {{text}}
    </span>

  </div>

</template>

<script>
export default {
  name: 'InfoMessage',
  props: {
    type: String,
    text: String,
    color: String,
    small: Boolean,
    large: Boolean
  },
  methods: {
    getIconClass () {
      return this.color ? ' icon-' + this.color : ''
    },
    getIconSize () {
      let size = null
      if (this.small) {
        size = '16'
      }
      if (this.large) {
        size = '24'
      }
      return size
    },
    getTextClass () {
      let cls = this.color ? ' text-' + this.color : ''
      cls += this.small ? ' text-smallest' : ''
      cls += this.large ? ' h2' : ''
      return cls
    }
  }
}
</script>

<style scoped>

</style>
