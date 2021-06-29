import { Outcome } from '@/utils/tree.structure'

interface IOutcomeVoting {
  outcome: string
  percentage: number
  voted: boolean
  isWinningOutcome: boolean
}

interface IOutcomeStatus {
  consensusReached: boolean
  market: string
  endDate: number
  decision: number
  totalSupply: number
  quorumPercentage: number
  quorumReached: boolean
  outcomes: Outcome[]
  voted?: IOutcomeVoting[]
}

interface IVotingObject {
  votingUuid: string
  predictionUuid: string
  milestoneUuid: string
  name: string
  state: 'pending' | 'current' | 'historical'
  step: 'has consensus' | 'consensus' | 'dispute'
  date: number
  OutcomeStatus?: IOutcomeStatus
}

// TODO check all types here and in child Interfaces!!!
export class VotingObject implements IVotingObject {
  votingUuid: string
  predictionUuid: string
  milestoneUuid: string
  name: string
  state: 'pending' | 'current' | 'historical'
  step: 'has consensus' | 'consensus' | 'dispute'
  date: number
  OutcomeStatus?: IOutcomeStatus

  constructor (data, state) {
    this.votingUuid = data.votingUuid
    this.predictionUuid = data.predictionUuid
    this.milestoneUuid = data.milestoneUuid
    this.name = data.name
    this.state = state
    this.step = data.step
    this.date = data.date
    console.log(data)
    this.OutcomeStatus = data.OutcomeStatus
  }
}
