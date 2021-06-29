<template>
  <div class="panel-content-container">
    <div class="p-mb-1">
      <div class="muted text-smallest p-mb-1">Your balance</div>
      <TextPair :data="userData.balance" icon="coins" unit="$DMT" />
    </div>
    <div class="p-mb-1 p-mt-2">
      <div class="muted text-smallest p-mb-1">Your stake</div>
      <TextPair :data="userData.stake" icon="coins" unit="$DMT" />
    </div>
    <div class="p-mb-1 p-mt-2">
      <div class="muted text-smallest p-mb-1">Staked on Farming</div>
      <TextPair :data="userData.farming" icon="coins" unit="$DMT" />
    </div>
    <div v-if="getUserStatus()" class="p-mb-1 p-mt-2">
      <div class="muted text-smallest p-mb-1">Your status</div>
      <TextPair :data="userStatus.status" :icon="userStatus.icon" />
    </div>
    <div class="text-smallest muted p-mt-2">
      {{ userStatus.notice }}
    </div>
  </div>
</template>

<script>
import TextPair from '@/components/TextPair'
export default {
  name: 'DmtBalancePanel',
  components: {
    TextPair
  },
  props: {
    userData: Object
  },
  data: function () {
    return {
      statuses: {
        guest: { status: 'Guest', notice: 'Text for any not connected site visitor', icon: null },
        connectedUser: { status: 'Connected user', notice: 'Text for  any user that has connected his wallet', icon: null },
        dmtHolder: { status: 'DMT Holder', notice: 'Top up your balance to 20,000 or more to get Qualified DMT Holder status and be able to start a dispute in the predictions with the Oracle consensus.', icon: null },
        qualified: { status: 'Qualified DMT Holder', notice: 'Your status allows you to start a dispute in the predictions with the Oracle consensus.', icon: 'crown' }
      },
      userStatus: {}

    }
  },
  methods: {
    getUserStatus () {
      if (this.userData.balance > 0) {
        this.userStatus = this.userData.balance > 20000 ? this.statuses.qualified : this.statuses.dmtHolder
        return 1
      } else {
        this.userStatus = null
        return null
      }
    }
  }
}
</script>

<style scoped>

</style>
