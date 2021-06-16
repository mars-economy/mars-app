<template>
  <div>
    <span class="span-link" v-on:click="showModal()">Disclaimer</span>
  </div>
  <Dialog v-model:visible="isShow"
          :breakpoints="{'960px': '75vw', '640px': '80vw'}"
          :showHeader="false" :style="{width: '50vw', height: 'auto'}" class="card custom-modal">
    <ModalCloseIcon v-on:click="closeModal()"></ModalCloseIcon>
    <div :class="{'mobile' : isMobile}" class="modal-content">
      <template v-if="isMobile">
        <ModalHeader header="Disclaimer" level="3"></ModalHeader>
      </template>
      <template v-else>
        <ModalLabel labels="Disclaimer"></ModalLabel>
      </template>
      <div class="modal-body">
        The information provided on this website does not constitute investment advice,
        financial advice, trading advice, or any other sort of advice and you should not treat
        any of the website's content as such.. By purchasing $DMT, you agree that you are
        not purchasing a security or investment and you agree to hold the team harmless and not
        liable for any losses or taxes you may incur. You also agree that the team is presenting
        the token "as is" and is not required to provide any support or services. You should have
        no expectation of any form from $DMT and its team. Although $DMT is an EXPERIMENTAL token
        for social experiment and not a digital currency. Always make sure that you are in
        compliance with your local laws and regulations before you make any purchase.
      </div>
    </div>
  </Dialog>
</template>

<script>

import ModalHeader from '@/components/modal/ModalHeader'
import ModalLabel from '@/components/modal/ModalLabel'
import ModalCloseIcon from '@/components/modal/ModalCloseIcon'

export default {
  name: 'Disclaimer',
  components: {
    ModalHeader,
    ModalLabel,
    ModalCloseIcon
  },
  props: {
    isMobile: Boolean
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    showModal () {
      this.isShow = true
    },
    closeModal () {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss">
  .span-link {
    text-decoration-line: underline;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
</style>
