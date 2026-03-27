export type ProposalStatus = 'active' | 'pending' | 'ended'

export type ProposalOption = {
  id: number
  label: string
  votes: number
}

export type Proposal = {
  id: number
  title: string
  summary: string
  creator: string
  category: string
  status: ProposalStatus
  endsAt: string
  startsAt: string
  featured?: boolean
  voters: number
  totalVotes: number
  participation: number
  options: ProposalOption[]
  userChoice?: number
}

export type CreateProposalDraft = {
  title: string
  options: string[]
  startDelayMinutes: number
  durationHours: number
}
