<template>
  <div class="panel-collapse">
    <div class="panel-header p-d-flex p-jc-between p-ai-center">
      <div class="panel-header-content">
        <slot name="header"></slot>
      </div>
      <div class="panel-toggler p-ml-auto">
        <Button :label="buttonText" class="btn-text"
                :icon="panelCollapsed ? 'pi pi-angle-down' : 'pi pi-angle-up'"
                iconPos="right"
                @click="toggle"
                :id="panelId +  '_header'"
                :aria-controls="panelId + '_content'"
                :aria-expanded="!panelCollapsed"
        />
      </div>
    </div>
    <transition name="toggleable-content">
      <div class="toggleable-content" v-show="!panelCollapsed" role="region" :id="panelId + '_content'" :aria-labelledby="panelId + '_header'">
          <slot name="accent"></slot>
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
    textToggle: String,
    textToggleAlt: String,
    panelId: String,
    toggleable: Boolean,
    collapsed: Boolean
  },
  data () {
    return {
      panelCollapsed: this.collapsed,
      buttonText: this.textToggle
    }
  },
  watch: {
    collapsed (newValue) {
      this.panelCollapsed = newValue
    }
  },
  methods: {
    toggle (event) {
      this.buttonText = this.panelCollapsed ? this.textToggleAlt : this.textToggle
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
  .panel-header-content {
    flex-grow: 1;
    padding-right: 24px;
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
