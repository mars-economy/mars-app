<template>
  <div>
    <Button label="$DMT balance" class="btn-light-stroke btn-small" @click="toggleDmtPanel($event)" />
    <OverlayPanel ref="DmtBalancePanel" :class="{'mobile' : isMobile}" :style="{width: '215px'}">
      <DmtBalancePanel :user-data="userData" />
    </OverlayPanel>
  </div>

</template>

<script>
import OverlayPanel from 'primevue/overlaypanel'
import DmtBalancePanel from '@/views/layout/header/DmtBalance/DmtBalancePanel'
export default {
  name: 'DmtBalance',
  props: {
    isMobile: Boolean
  },
  components: {
    DmtBalancePanel,
    OverlayPanel
  },
  data: function () {
    return {
      userData: {
        balance: 49000,
        stake: 0,
        farming: 21234
      }
    }
  },
  methods: {
    toggleDmtPanel (event) {
      this.$refs.DmtBalancePanel.toggle(event)
    }
  }
}
</script>

<style scoped>
.p-button {
  text-transform: none;
}
</style>
