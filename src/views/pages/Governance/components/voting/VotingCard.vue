<template>
  <div class="voting-card card" :class="{'mobile' : isMobile}">
    <CardLabel label-pos="left" color="light" :label="prediction.step" />
    <CardLabel label-pos="right" color="primary" label="pending" v-if="prediction.state === 'pending'" />

    <div class="card-header p-d-flex p-ai-center p-jc-between p-mb-sm-3" :class="{'p-mb-3' : isVotingPage}">
      <div class="h3">
        {{prediction.name}}
      </div>
      <div v-if="isMobile && !isVotingPage">
        <Button  label=' ' class="btn-text" icon="pi pi-angle-right" iconPos="right"
                 @click="onLoadVoting(prediction.votingUuid)" />
      </div>
    </div>

    <template v-if="!isMobile || isVotingPage">
      <div class="card-accent-line p-jc-between p-ai-center p-py-3 p-d-sm-flex">
        <div class="p-d-sm-flex p-jc-start p-ai-center p-flex-wrap">
          <TextPair :data="prepareDate(prediction.date)"
                    icon="date"
                    :label="prediction.state === 'pending' ? 'due date' : 'voting end date'"
                    class="p-mr-4 p-mb-3 p-mb-lg-0"/>
          <template v-if="prediction.state === 'historical'">
            <TextPair :data="prediction.OutcomeVoting?.totalSupply"
                      icon="coins"
                      label="$DMT voted"
                      class="p-mr-4 p-mb-3 p-mb-lg-0"/>
            <TextPair :data="getQuorumData()"
                      icon="users"
                      label="quorum"
                      class="p-mr-4 p-mb-3 p-mb-lg-0"/>
          </template>
        </div>
        <div class="links p-ml-auto">
          <span class="text-link p-mr-3" @click="onLoadVoting(prediction.votingUuid)" v-if="!isVotingPage">
            Go to the voting page
          </span>
          <span class="text-link" v-if="!isMobile" @click="onLoadPrediction(prediction.milestoneUuid)">
            Go to the prediction page
          </span>
          <Button label="Go to the prediction page" class="btn-light btn-small" @click="onLoadPrediction(prediction.milestoneUuid)" v-else />
        </div>
      </div>
      <div class="card-body">

        <template v-if="prediction.state === 'pending' ">
          <Button :label="getButtonLabel()" class="btn-primary p-mt-3" v-if="getButtonLabel()" @click="onShowConfirmation()" />
          <ConfirmationPopup :submit-action="getButtonLabel()"
                             :prediction-name="prediction.name"
                             v-if="isShowConfirmation"
                             @close="onHideConfirmation"
                             @submit="onHideConfirmation"
          />
        </template>

        <template  v-if="prediction.state === 'current'">
          <VotingChoicePanel :outcomes="getVotingChoiceVariant()" :prediction-name="prediction.name" />
        </template>

        <template  v-if="prediction.state === 'historical'">
          <VotingResultPanel :outcomes="getVotingChoiceVariant()" />
        </template>

      </div>
    </template>

  </div>

</template>

<script>
import { getFormattedData } from '@/helpers/date.helper'
import VotingChoicePanel from '@/views/pages/Governance/components/voting/VotingChoicePanel'
import VotingResultPanel from '@/views/pages/Governance/components/voting/VotingResultPanel'
import ConfirmationPopup from './ConfirmationPopup'

export default {
  name: 'VotingCard',
  components: {
    ConfirmationPopup,
    VotingResultPanel,
    VotingChoicePanel
  },
  props: {
    prediction: Object,
    isMobile: Boolean
  },
  data: function () {
    return {
      user: { role: 'Qualified DMT Holder' },
      isVotingPage: Boolean,
      isShowConfirmation: false
    }
  },
  methods: {
    prepareDate (timeS) {
      return getFormattedData(timeS)
    },
    getButtonLabel () {
      if (this.prediction.step === 'no consensus') {
        return 'start voting'
      }
      if (this.prediction.step === 'consensus' && this.user.role === 'Qualified DMT Holder') {
        return 'start dispute'
      } else {
        return null
      }
    },
    getVotingChoiceVariant () {
      return this.prediction.OutcomeStatus?.voted.map((outcome, i) => {
        outcome['name'] = this.prediction.OutcomeStatus.outcomes[i].name
        return outcome
      })
    },
    getQuorumData () {
      let data = this.prediction.OutcomeStatus?.quorumReached ? 'Yes' : 'No'
      data += ' (' + this.prediction.OutcomeStatus?.quorumPercentage + '%)'
      return data
    },
    onLoadVoting (id) {
      this.$router.push('/governance/voting/' + id)
    },
    onShowConfirmation () {
      this.isShowConfirmation = true
    },
    onHideConfirmation () {
      this.isShowConfirmation = false
    },
    onLoadPrediction (id) {
      this.$router.push('/milestone/' + id)
    }
  },
  watch: {
    $route: {
      handler: async function (route) {
        this.isVotingPage = route.params.id
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
  .voting-card {
    padding-top: 42px;
    padding-bottom: 24px;
  }

</style>
