<template>
    <div class="p-d-flex p-flex-column p-flex-sm-row ">
      <div class="p-d-flex p-flex-column p-flex-sm-row p-flex-wrap">
        <div v-for="item of outcomes" :key="item.outcome"
             class="p-field-radiobutton field-button p-mt-3 p-mr-sm-3">
          <RadioButton :id="item.outcome"
                       :name="item.name"
                       :value="item.outcome"
                       v-model="outcomeSelected"
                       :class="getRadioButtonState(item.voted, item.outcome)"/>
          <label :for="item.outcome">{{item.name}}</label>
        </div>
      </div>

      <div class="p-mt-3" v-if="!voted">
        <Button label="vote" class="btn-primary btn-block" :disabled="outcomeSelected === null" @click="onShowConfirmation()"/>
      </div>
      <Dialog v-model:visible="isShowConfirmation"
              :breakpoints="{'375px': '90vw'}"
              :showHeader="false" :style="{width: '320px', height: 'auto'}" class="card custom-modal">
        <ConfirmationPopup :outcome="getOutcomeSelected()"
                           @cancel="onHideConfirmation"
                           @vote="onVote"/>
      </Dialog>
    </div>
</template>

<script>
import RadioButton from 'primevue/radiobutton'
import Dialog from 'primevue/dialog'
import ConfirmationPopup from './ConfirmationPopup'

export default {
  name: 'VotingChoicePanel',
  components: {
    ConfirmationPopup,
    Dialog,
    RadioButton
  },
  props: {
    outcomes: Object,
    isMobile: Boolean
  },
  data: function () {
    return {
      outcomeSelected: null,
      voted: false,
      isShowConfirmation: false
    }
  },
  methods: {
    onShowConfirmation () {
      this.isShowConfirmation = true
    },
    onHideConfirmation () {
      this.isShowConfirmation = false
    },
    onVote () {
      this.voted = true
      this.onHideConfirmation()
    },
    getRadioButtonState (voted, id) {
      if (voted) {
        this.voted = true
        this.outcomeSelected = id
      }
      if (this.voted) {
        return 'disabled'
      }
    },
    getOutcomeSelected () {
      return this.outcomes.find(object => object.outcome === this.outcomeSelected).name
    }
  }
}
</script>

<style scoped>

</style>
