'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink, Loader2, RefreshCcw, ShieldCheck, Vote } from 'lucide-react'
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { AppShell } from '@/components/app-shell'
import { PageHeader } from '@/components/page-header'
import { StatusChip } from '@/components/status-chip'
import { CONTRACT_ADDRESS, openPollAbi } from '@/lib/appConfig'
import type { Proposal } from '@/lib/types'
import { formatCompactNumber, getTimeLeft, leadingOption, shortenAddress } from '@/lib/utils'

export function ProposalDetailPage({ proposal }: { proposal: Proposal }) {
  const { address, isConnected } = useAccount()
  const [selectedOption, setSelectedOption] = useState<number | null>(proposal.userChoice ?? null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [txMode, setTxMode] = useState<'vote' | 'refresh' | null>(null)

  const votesRead = useReadContract({
    abi: openPollAbi,
    address: CONTRACT_ADDRESS,
    functionName: 'getVotes',
    args: [BigInt(proposal.id)],
    query: {
      retry: 1,
    },
  })

  const onchainVotes = useMemo(() => {
    const result = votesRead.data
    if (!result?.length) return proposal.options
    return proposal.options.map((option, index) => ({
      ...option,
      votes: Number(result[index] ?? BigInt(option.votes)),
    }))
  }, [proposal.options, votesRead.data])

  const totalVotes = onchainVotes.reduce((sum, option) => sum + option.votes, 0)
  const lead = leadingOption({ ...proposal, options: onchainVotes, totalVotes })

  const { data: hash, isPending, writeContract } = useWriteContract()
  const receipt = useWaitForTransactionReceipt({ hash })

  const submitVote = () => {
    if (selectedOption === null) return
    setTxMode('vote')
    writeContract({
      abi: openPollAbi,
      address: CONTRACT_ADDRESS,
      functionName: 'vote',
      args: [BigInt(proposal.id), selectedOption],
    })
    setShowConfirm(false)
  }

  const refreshStatus = () => {
    setTxMode('refresh')
    writeContract({
      abi: openPollAbi,
      address: CONTRACT_ADDRESS,
      functionName: 'updateStatus',
      args: [BigInt(proposal.id)],
    })
  }

  const txMessage =
    txMode === 'vote'
      ? receipt.isSuccess
        ? 'Vote confirmed on Base.'
        : isPending || receipt.isLoading
          ? 'Submitting your vote...'
          : hash
            ? 'Vote sent. Waiting for receipt...'
            : null
      : txMode === 'refresh'
        ? receipt.isSuccess
          ? 'Status refresh confirmed.'
          : isPending || receipt.isLoading
            ? 'Refreshing proposal status...'
            : hash
              ? 'Status update sent. Waiting for receipt...'
              : null
        : null

  return (
    <AppShell>
      <PageHeader backHref="/" title={proposal.title} subtitle={proposal.summary} />

      <section className="panel mb-4 rounded-panel p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">{proposal.category}</p>
            <div className="flex flex-wrap items-center gap-2">
              <StatusChip status={proposal.status} />
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted">{getTimeLeft(proposal.endsAt)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={refreshStatus}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
            aria-label="Refresh status"
          >
            <RefreshCcw className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-muted">Leading</p>
            <p className="mt-1 text-sm font-semibold">{lead?.label ?? 'None'}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-muted">Total votes</p>
            <p className="mt-1 text-sm font-semibold">{formatCompactNumber(totalVotes)}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-muted">Creator</p>
            <p className="mt-1 text-sm font-semibold">{proposal.creator}</p>
          </div>
        </div>
      </section>

      <section className="panel mb-4 rounded-panel p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted">Decision board</p>
            <h2 className="mt-2 text-lg font-semibold">Pick one outcome</h2>
          </div>
          <span className="rounded-full bg-primary/15 px-3 py-1 text-xs text-primary">
            One vote per address
          </span>
        </div>

        <div className="space-y-3">
          {onchainVotes.map((option) => {
            const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedOption(option.id)}
                className={`surface-line w-full rounded-[16px] p-4 text-left transition ${
                  selectedOption === option.id ? 'bg-primary/15 ring-1 ring-primary' : 'bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-text">{option.label}</p>
                    <p className="mt-1 text-sm text-muted">{option.votes} votes</p>
                  </div>
                  <p className="text-lg font-semibold text-text">{percentage}%</p>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={!isConnected || selectedOption === null || proposal.status !== 'active'}
            onClick={() => setShowConfirm(true)}
            className="inline-flex items-center justify-center gap-2 rounded-[16px] bg-white px-4 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Vote className="h-4 w-4" />
            Cast vote
          </button>
          <Link
            href={`https://basescan.org/address/${CONTRACT_ADDRESS}`}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 rounded-[16px] border border-white/10 bg-white/5 px-4 py-3 font-semibold"
          >
            Contract
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="panel rounded-panel p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-text">
          <ShieldCheck className="h-4 w-4 text-accent" />
          Onchain snapshot
        </div>
        <div className="grid gap-3">
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-muted">Contract</p>
            <p className="mt-1 break-all text-sm font-medium">{CONTRACT_ADDRESS}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-muted">Connected voter</p>
            <p className="mt-1 text-sm font-medium">{shortenAddress(address)}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-muted">Vote fetch</p>
            <p className="mt-1 text-sm font-medium">
              {votesRead.isLoading ? 'Reading chain...' : votesRead.error ? 'Using cached feed data' : 'Live vote counts loaded'}
            </p>
          </div>
        </div>
      </section>

      {showConfirm ? (
        <div className="fixed inset-0 z-50 flex items-end bg-slate-950/60 p-4">
          <div className="panel mx-auto w-full max-w-[408px] rounded-[24px] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">Confirm vote</p>
            <h3 className="mt-2 text-xl font-semibold text-text">
              {selectedOption !== null ? onchainVotes[selectedOption]?.label : 'Select an option'}
            </h3>
            <p className="mt-2 text-sm text-muted">This wallet can vote once for this proposal.</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-3 font-semibold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={submitVote}
                className="rounded-[16px] bg-white px-4 py-3 font-semibold text-slate-950"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {txMessage ? (
        <div className="fixed inset-x-4 bottom-24 z-50 mx-auto flex max-w-[408px] items-center gap-3 rounded-[18px] border border-white/10 bg-surface/95 px-4 py-4 shadow-soft">
          {isPending || receipt.isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4 text-accent" />}
          <span className="text-sm text-text">{txMessage}</span>
        </div>
      ) : null}
    </AppShell>
  )
}
