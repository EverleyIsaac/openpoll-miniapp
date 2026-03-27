import type { Proposal } from '@/lib/types'

const now = Date.now()

export const mockProposals: Proposal[] = [
  {
    id: 18,
    title: 'Treasury sprint for local builder grants',
    summary: 'Fund a 6-week micro-grants round for builders shipping community tools on Base.',
    creator: '0x7A12...42df',
    category: 'Community',
    status: 'active',
    startsAt: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
    endsAt: new Date(now + 19 * 60 * 60 * 1000).toISOString(),
    featured: true,
    voters: 328,
    totalVotes: 1482,
    participation: 71,
    options: [
      { id: 0, label: 'For', votes: 912 },
      { id: 1, label: 'Against', votes: 570 },
    ],
  },
  {
    id: 21,
    title: 'Open badge for weekly voter streaks',
    summary: 'Add lightweight reputation badges for addresses that vote in 4 consecutive proposals.',
    creator: '0x83f1...a2C1',
    category: 'Product',
    status: 'active',
    startsAt: new Date(now - 5 * 60 * 60 * 1000).toISOString(),
    endsAt: new Date(now + 7 * 60 * 60 * 1000).toISOString(),
    featured: true,
    voters: 191,
    totalVotes: 861,
    participation: 64,
    options: [
      { id: 0, label: 'Ship now', votes: 502 },
      { id: 1, label: 'Need revisions', votes: 232 },
      { id: 2, label: 'Reject', votes: 127 },
    ],
  },
  {
    id: 24,
    title: 'Permissionless listing for community working groups',
    summary: 'Let any address create a public working group profile tied to a proposal stream.',
    creator: '0x90b2...13ff',
    category: 'Governance',
    status: 'pending',
    startsAt: new Date(now + 3 * 60 * 60 * 1000).toISOString(),
    endsAt: new Date(now + 29 * 60 * 60 * 1000).toISOString(),
    voters: 0,
    totalVotes: 0,
    participation: 0,
    options: [
      { id: 0, label: 'Approve', votes: 0 },
      { id: 1, label: 'Hold', votes: 0 },
    ],
  },
  {
    id: 17,
    title: 'Retro funding for moderation and translation',
    summary: 'Reward contributors who kept proposal discussions readable and multilingual.',
    creator: '0x6ef0...4210',
    category: 'Treasury',
    status: 'ended',
    startsAt: new Date(now - 72 * 60 * 60 * 1000).toISOString(),
    endsAt: new Date(now - 9 * 60 * 60 * 1000).toISOString(),
    voters: 410,
    totalVotes: 1704,
    participation: 83,
    options: [
      { id: 0, label: 'For', votes: 1108 },
      { id: 1, label: 'Against', votes: 596 },
    ],
  },
  {
    id: 12,
    title: 'Gas rebate for first-time proposal creators',
    summary: 'Cover a portion of gas costs for the first proposal each address publishes.',
    creator: '0x3Be1...c882',
    category: 'Growth',
    status: 'ended',
    startsAt: new Date(now - 120 * 60 * 60 * 1000).toISOString(),
    endsAt: new Date(now - 48 * 60 * 60 * 1000).toISOString(),
    voters: 282,
    totalVotes: 1020,
    participation: 58,
    options: [
      { id: 0, label: 'Pilot', votes: 441 },
      { id: 1, label: 'Pause', votes: 214 },
      { id: 2, label: 'Decline', votes: 365 },
    ],
  },
]

export function getProposalById(id: number) {
  return mockProposals.find((proposal) => proposal.id === id)
}
