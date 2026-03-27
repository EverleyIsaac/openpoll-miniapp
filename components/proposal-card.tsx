import Link from 'next/link'
import { ArrowUpRight, UsersRound } from 'lucide-react'
import type { Proposal } from '@/lib/types'
import { formatCompactNumber, getTimeLeft, leadingOption } from '@/lib/utils'
import { StatusChip } from '@/components/status-chip'

export function ProposalCard({ proposal }: { proposal: Proposal }) {
  const lead = leadingOption(proposal)

  return (
    <Link
      href={`/proposal/${proposal.id}`}
      className="panel flex rounded-panel p-4 transition hover:-translate-y-0.5"
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted">{proposal.category}</p>
            <h3 className="text-base font-semibold text-text">{proposal.title}</h3>
          </div>
          <StatusChip status={proposal.status} />
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-muted">Ends</p>
            <p className="mt-1 font-semibold text-text">{getTimeLeft(proposal.endsAt)}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-muted">Votes</p>
            <p className="mt-1 font-semibold text-text">{formatCompactNumber(proposal.totalVotes)}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-muted">Lead</p>
            <p className="mt-1 font-semibold text-text">{lead?.label ?? 'None'}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted">
          <span className="inline-flex items-center gap-2">
            <UsersRound className="h-4 w-4" />
            {proposal.voters} voters
          </span>
          <span className="inline-flex items-center gap-1 text-text">
            View
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
