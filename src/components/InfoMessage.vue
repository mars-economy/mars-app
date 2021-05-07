<template>
  <div class="p-d-inline-flex p-ai-center">
    <Icon :name="type" :class="getIconClass()" class="p-mr-2" :size="getIconSize()" />
    <span :class="getTextClass()">
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
    small: Boolean
  },
  methods: {
    getIconClass () {
      return this.color ? ' icon-' + this.color : ''
    },
    getIconSize () {
      return this.small ? '16' : null
    },
    getTextClass () {
      let cls = this.color ? ' text-' + this.color : ''
      cls += this.small ? ' text-smallest' : ''
      return cls
    }
  }
}
</script>

<style scoped>

</style>
