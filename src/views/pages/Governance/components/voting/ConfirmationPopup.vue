<template>
<div>
  <ModalCloseIcon @closeModal="$emit('closeModal')"></ModalCloseIcon>
  <ModalLabel labels="governance voting" />
  <div class="modal-content">
    <div class="modal-body">
      <div>
        Are you sure you want to vote this way?
      </div>
      <div class="p-text-bold p-mt-3">
        Will NASA announce the crew members destined for the first Mars Mission by June 2023?
      </div>
    </div>
    <Divider type="solid" class="p-mt-3" />

    <div class="p-field-radiobutton p-mt-3" v-if="outcome">
      <div class="p-radiobutton p-component">
        <div class="p-radiobutton-box p-highlight">
          <div class="p-radiobutton-icon"></div>
        </div>
      </div>
      <label class="p-ml-2">{{outcome}}</label>
    </div>
    <Divider type="solid" class="p-mt-3" />

    <div class="modal-footer p-grid">
      <div class="p-col-6">
        <Button label="cancel" class="btn-light btn-block" @click="$emit('cancel')" />
      </div>
      <div class="p-col-6">
        <Button label="vote" class="btn-primary btn-block"  @click="$emit('vote')" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ModalCloseIcon from '@/components/modal/ModalCloseIcon'
import ModalLabel from '@/components/modal/ModalLabel'

export default {
  name: 'ConfirmationPopup',
  components: {
    ModalLabel,
    ModalCloseIcon
  },
  props: {
    outcome: String
  }
}
</script>

<style scoped>

</style>
