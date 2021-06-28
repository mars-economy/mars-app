<template>
  <Dialog v-model:visible="isShow"
          :breakpoints="{'375px': '90vw'}"
          :showHeader="false" :style="{width: '320px', height: 'auto'}" class="card custom-modal">
  <ModalCloseIcon @closeModal="$emit('close')"></ModalCloseIcon>
  <ModalLabel labels="governance voting" />
  <div class="modal-content">
    <div class="modal-body">
      <div>
        {{ getNotice() }}
      </div>
      <div class="p-text-bold p-mt-3">
        {{ predictionName }}
      </div>
    </div>

    <template v-if="outcome">
      <Divider type="solid" class="p-mt-3" />
      <div class="p-field-radiobutton p-mt-3">
        <div class="p-radiobutton p-component">
          <div class="p-radiobutton-box p-highlight">
            <div class="p-radiobutton-icon"></div>
          </div>
        </div>
        <label class="p-ml-2">{{outcome.name}}</label>
      </div>
      <Divider type="solid" class="p-mt-3" />
    </template>

    <div class="modal-footer p-grid">
      <div class="p-col-6">
        <Button label="cancel" class="btn-light btn-block" @click="$emit('close')" />
      </div>
      <div class="p-col-6">
        <Button :label="submitAction" class="btn-primary btn-block"  @click="$emit('submit')" />
      </div>
    </div>
  </div>
  </Dialog>
</template>

<script>
import ModalCloseIcon from '@/components/modal/ModalCloseIcon'
import ModalLabel from '@/components/modal/ModalLabel'
import Dialog from 'primevue/dialog'

export default {
  name: 'ConfirmationPopup',
  components: {
    Dialog,
    ModalLabel,
    ModalCloseIcon
  },
  props: {
    predictionName: String,
    outcome: Object,
    submitAction: String
  },
  data: function () {
    return {
      isShow: true,
      confirmationData: [
        { action: 'vote', notice: 'Are you sure you want to vote this way?' },
        { action: 'start voting', notice: 'Are you sure you want to start voting for this prediction? It will cost some gas (you will see the amount in your wallet).' },
        { action: 'start dispute', notice: 'Are you sure you want to start a dispute for this prediction? It will cost some gas (you will see the amount in your wallet).' }
      ]
    }
  },
  methods: {
    getNotice () {
      return this.confirmationData.find(object => object.action === this.submitAction).notice
    }
  }
}
</script>

<style scoped>

</style>
