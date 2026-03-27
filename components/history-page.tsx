import Link from 'next/link'
import { Trophy } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { PageHeader } from '@/components/page-header'
import { mockProposals } from '@/lib/mockData'
import { leadingOption } from '@/lib/utils'

export function HistoryPage() {
  const ended = mockProposals.filter((proposal) => proposal.status === 'ended')

  return (
    <AppShell>
      <PageHeader backHref="/" title="Resolved votes and public outcomes." subtitle="Browse completed proposals and see the leading result." />
      <div className="space-y-3">
        {ended.map((proposal) => {
          const lead = leadingOption(proposal)

          return (
            <Link key={proposal.id} href={`/proposal/${proposal.id}`} className="panel block rounded-panel p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-muted">{proposal.category}</p>
                  <h2 className="mt-2 font-semibold text-text">{proposal.title}</h2>
                </div>
                <Trophy className="h-5 w-5 text-warning" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/5 p-3">
                  <p className="text-xs text-muted">Winning option</p>
                  <p className="mt-1 text-sm font-semibold">{lead?.label ?? 'None'}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-3">
                  <p className="text-xs text-muted">Total votes</p>
                  <p className="mt-1 text-sm font-semibold">{proposal.totalVotes}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </AppShell>
  )
}
