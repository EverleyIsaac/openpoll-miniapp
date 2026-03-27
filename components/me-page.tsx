'use client'

import Link from 'next/link'
import { CheckCheck, Clock3, ExternalLink, PlusSquare } from 'lucide-react'
import { useAccount } from 'wagmi'
import { AppShell } from '@/components/app-shell'
import { PageHeader } from '@/components/page-header'
import { mockProposals } from '@/lib/mockData'
import { shortenAddress } from '@/lib/utils'

export function MePage() {
  const { address, isConnected } = useAccount()
  const joined = mockProposals.slice(0, 3)
  const created = mockProposals.filter((proposal) => proposal.status !== 'ended').slice(0, 2)

  return (
    <AppShell>
      <PageHeader
        title="Your vote trail and proposal momentum."
        subtitle="Track what you joined, what you created, and what is still waiting on you."
      />

      <section className="panel mb-4 rounded-panel p-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-muted">Wallet</p>
            <p className="mt-1 text-sm font-semibold">{isConnected ? shortenAddress(address) : 'Not connected'}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-muted">Joined</p>
            <p className="mt-1 text-sm font-semibold">{joined.length} votes</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-muted">Created</p>
            <p className="mt-1 text-sm font-semibold">{created.length} proposals</p>
          </div>
        </div>
      </section>

      <section className="mb-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text">
          <Clock3 className="h-4 w-4 text-warning" />
          Waiting on your action
        </div>
        <div className="space-y-3">
          {joined.map((proposal) => (
            <Link key={proposal.id} href={`/proposal/${proposal.id}`} className="panel flex rounded-panel p-4">
              <div className="w-full">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-text">{proposal.title}</h3>
                  <ExternalLink className="h-4 w-4 text-muted" />
                </div>
                <p className="mt-2 text-sm text-muted">{proposal.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text">
          <PlusSquare className="h-4 w-4 text-primary" />
          Created by you
        </div>
        <div className="space-y-3">
          {created.map((proposal) => (
            <div key={proposal.id} className="panel rounded-panel p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-text">{proposal.title}</h3>
                <span className="rounded-full bg-primary/15 px-3 py-1 text-xs text-primary">{proposal.category}</span>
              </div>
              <p className="mt-2 text-sm text-muted">Creator actions stay permissionless and visible.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel rounded-panel p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text">
          <CheckCheck className="h-4 w-4 text-accent" />
          History shortcut
        </div>
        <Link href="/history" className="inline-flex rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950">
          View resolved results
        </Link>
      </section>
    </AppShell>
  )
}
