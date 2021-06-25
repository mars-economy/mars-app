<template>
  <div class="panel-collapse" :class="{'mobile': isMobile}">
    <div class="panel-header p-d-flex p-jc-between p-ai-center">
      <div class="panel-header-content">
        <slot name="header"></slot>
      </div>
      <div class="panel-toggler p-ml-auto" :class="{'p-d-none p-d-sm-inline-flex' : panelFooter === 'mobile'}">
        <Button :label="buttonText" class="btn-text" :class="{'btn-primary' : panelFooter}"
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
        <slot name="panel-content-before">
        </slot>
        <slot name="accent"></slot>
        <div class="panel-content">
          <slot></slot>
        </div>
      </div>
    </transition>
    <div class="panel-footer p-d-flex p-jc-between p-ai-center" v-if="panelFooter" :class="{'p-d-sm-none' : panelFooter === 'mobile'}">
      <div class="panel-footer-content">
        <slot name="footer"></slot>
      </div>
      <div class="panel-toggler p-ml-auto">
        <Button :label="buttonText" class="btn-text" :class="{'btn-primary' : panelFooter}"
                :icon="panelCollapsed ? 'pi pi-angle-down' : 'pi pi-angle-up'"
                iconPos="right"
                @click="toggle"
                :id="panelId +  '_header'"
                :aria-controls="panelId + '_content'"
                :aria-expanded="!panelCollapsed"
        />
      </div>

    </div>
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
    panelFooter: { type: String, default: null },
    toggleable: Boolean,
    collapsed: Boolean,
    isMobile: Boolean
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
  .panel-header, .panel-content, .panel-footer {
    padding: 10px 24px 12px;
    border-top: $border-light;
  }
  .panel-content-before {
    @extend %card-px;
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

  .panel-collapse.mobile {
    .panel-header, .panel-content, .panel-content-before, .panel-footer {
      @extend %card-mobile-px;
    }
  }
</style>
