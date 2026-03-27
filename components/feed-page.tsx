'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Filter, Flame, History, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AppShell } from '@/components/app-shell'
import { PageHeader } from '@/components/page-header'
import { ProposalCard } from '@/components/proposal-card'
import { StatusChip } from '@/components/status-chip'
import { mockProposals } from '@/lib/mockData'
import type { ProposalStatus } from '@/lib/types'
import { formatCompactNumber, getTimeLeft } from '@/lib/utils'

const filters: Array<{ key: ProposalStatus; label: string }> = [
  { key: 'active', label: 'Active' },
  { key: 'pending', label: 'Pending' },
  { key: 'ended', label: 'Ended' },
]

export function FeedPage() {
  const [filter, setFilter] = useState<ProposalStatus>('active')

  const featured = useMemo(
    () => mockProposals.filter((proposal) => proposal.featured || proposal.status === 'active').slice(0, 3),
    [],
  )
  const filtered = useMemo(
    () => mockProposals.filter((proposal) => proposal.status === filter),
    [filter],
  )
  const endingSoon = useMemo(
    () =>
      [...mockProposals]
        .filter((proposal) => proposal.status === 'active')
        .sort((a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime())[0],
    [],
  )

  return (
    <AppShell
      cta={
        <Link
          href="/create"
          className="fixed bottom-24 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-soft"
          aria-label="Create proposal"
        >
          <Plus className="h-6 w-6" />
        </Link>
      }
    >
      <PageHeader
        eyebrow="Open Governance"
        title="Browse, vote, and watch proposals resolve."
        subtitle="Live proposal flow on Base with quick status, turnout, and result visibility."
      />

      <section className="panel mb-5 rounded-panel p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted">Status first</p>
            <h2 className="mt-2 text-lg font-semibold">Active pulse</h2>
          </div>
          <Link href="/history" className="inline-flex items-center gap-2 text-sm text-muted">
            <History className="h-4 w-4" />
            History
          </Link>
        </div>
        {endingSoon ? (
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/5 p-3">
              <p className="text-xs text-muted">Ending soon</p>
              <p className="mt-1 text-sm font-semibold">{getTimeLeft(endingSoon.endsAt)}</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-3">
              <p className="text-xs text-muted">Live votes</p>
              <p className="mt-1 text-sm font-semibold">{formatCompactNumber(endingSoon.totalVotes)}</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-3">
              <p className="text-xs text-muted">Turnout</p>
              <p className="mt-1 text-sm font-semibold">{endingSoon.participation}%</p>
            </div>
          </div>
        ) : null}
      </section>

      <section className="mb-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
            <Flame className="h-4 w-4 text-warning" />
            Hot proposals
          </div>
          <span className="text-xs text-muted">Swipe</span>
        </div>
        <div className="thin-scroll flex gap-3 overflow-x-auto pb-2">
          {featured.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: index * 0.05 }}
              className="panel min-w-[286px] rounded-panel p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-muted">{proposal.category}</p>
                  <h3 className="mt-2 text-lg font-semibold">{proposal.title}</h3>
                </div>
                <StatusChip status={proposal.status} />
              </div>
              <p className="mt-3 text-sm text-muted">{proposal.summary}</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">Votes</p>
                  <p className="mt-1 font-semibold">{formatCompactNumber(proposal.totalVotes)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Ends</p>
                  <p className="mt-1 font-semibold">{getTimeLeft(proposal.endsAt)}</p>
                </div>
                <Link
                  href={`/proposal/${proposal.id}`}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950"
                >
                  Open
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
            <Filter className="h-4 w-4 text-primary" />
            Proposal flow
          </div>
          <div className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1">
            {filters.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                  filter === item.key ? 'bg-white text-slate-950' : 'text-muted'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {filtered.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      </section>
    </AppShell>
  )
}

