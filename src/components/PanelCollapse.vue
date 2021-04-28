<template>
  <div class="panel-collapse">
    <div class="panel-header" :style="{'text-align':headerPos}">
      <Button :label="header" class="btn-text"
              :icon="{'pi pi-angle-up': !panelCollapsed, 'pi pi-angle-down': panelCollapsed}"
              iconPos="right"
              @click="toggle"
              :id="panelId +  '_header'"
              :aria-controls="panelId + '_content'"
              :aria-expanded="!panelCollapsed"
              />
    </div>
    <transition name="toggleable-content">
      <div class="toggleable-content" v-show="!panelCollapsed" role="region" :id="panelId + '_content'" :aria-labelledby="panelId + '_header'">
        <div class="panel-content">
          <slot></slot>
        </div>
      </div>
    </transition>

  </div>

</template>

<script>
export default {
  name: 'PanelCollapse',
  emits: ['update:collapsed', 'toggle'],
  props: {
    header: String,
    headerPos: String,
    panelId: String,
    toggleable: Boolean,
    collapsed: Boolean
  },
  data () {
    return {
      panelCollapsed: this.collapsed
    }
  },
  watch: {
    collapsed (newValue) {
      this.panelCollapsed = newValue
    }
  },
  methods: {
    toggle (event) {
      this.panelCollapsed = !this.panelCollapsed
      this.$emit('update:collapsed', this.panelCollapsed)
      this.$emit('toggle', {
        originalEvent: event,
        value: this.panelCollapsed
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .panel-header, .panel-content {
    padding: 10px 24px 12px;
    border-top: $border-light;
  }
  .toggleable-content-enter-from,
  .toggleable-content-leave-to {
    max-height: 0;
  }

  .toggleable-content-enter-to,
  .toggleable-content-leave-from {
    max-height: 1000px;
  }

  .toggleable-content-leave-active {
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
  }

  .toggleable-content-enter-active {
    overflow: hidden;
    transition: max-height 1s ease-in-out;
  }

</style>
