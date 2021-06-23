<template>
  <div>
    <div class="p-d-flex">
      <div class="p-d-flex p-flex-wrap">
        <div v-for="(item, index) of outcomes" :key="index" class="p-field-radiobutton p-mt-3">
          <RadioButton :id="index" name="item.outcome" :value="index" v-model="outcomeSelected" :class="getRadioButtonState(item, index)"/>
          <label :for="index">{{item.outcome}}</label>
        </div>
      </div>

      <div class="p-mt-3 p-ml-3" v-if="!voted">
        <Button label="vote" class="btn-primary" :disabled="outcomeSelected === null" @click="onClick($event)"/>
      </div>

    </div>
  </div>
</template>

<script>
import RadioButton from 'primevue/radiobutton'

export default {
  name: 'VotingChoicePanel',
  components: {
    RadioButton
  },
  props: {
    outcomes: Object
  },
  data: function () {
    return {
      outcomeSelected: null,
      voted: false
    }
  },
  methods: {
    onClick (event) {
      this.$emit('vote', event)
    },
    getRadioButtonState (item, index) {
      if (item.voted) {
        this.voted = true
        this.outcomeSelected = index
      }
      if (this.voted) {
        return 'disabled'
      }
    }
  }
}
</script>

<style scoped>

</style>
