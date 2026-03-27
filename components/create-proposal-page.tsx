'use client'

import { useMemo, useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { AppShell } from '@/components/app-shell'
import { PageHeader } from '@/components/page-header'
import { BUILDER_CODE, BUILDER_CODE_ENCODED, CONTRACT_ADDRESS, openPollAbi } from '@/lib/appConfig'
import { toBase64Url } from '@/lib/utils'

const defaultOptions = ['For', 'Against']
const startDelayChoices = [0, 15, 60, 180]
const durationChoices = [6, 12, 24, 72]

export function CreateProposalPage() {
  const [title, setTitle] = useState('')
  const [options, setOptions] = useState(defaultOptions)
  const [startDelay, setStartDelay] = useState(15)
  const [durationHours, setDurationHours] = useState(24)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const payload = useMemo(() => {
    const body = {
      title,
      options,
      builderCode: BUILDER_CODE,
      encodedBuilderCode: BUILDER_CODE_ENCODED,
      createdAt: new Date().toISOString(),
    }

    return `openpoll://${toBase64Url(JSON.stringify(body))}`
  }, [options, title])

  const { data: hash, isPending, writeContract } = useWriteContract()
  const receipt = useWaitForTransactionReceipt({ hash })

  const canSubmit = title.trim().length > 4 && options.filter((option) => option.trim()).length >= 2

  const updateOption = (index: number, value: string) => {
    setOptions((current) => current.map((option, optionIndex) => (optionIndex === index ? value : option)))
  }

  const addOption = () => {
    if (options.length >= 4) return
    setOptions((current) => [...current, `Option ${current.length + 1}`])
  }

  const handleCreate = () => {
    if (!canSubmit) return
    setSubmitting(true)
    writeContract({
      abi: openPollAbi,
      address: CONTRACT_ADDRESS,
      functionName: 'createProposal',
      args: [
        BigInt(startDelay * 60),
        BigInt(durationHours * 60 * 60),
        options.filter((option) => option.trim()).length,
        payload,
      ],
    })
    setShowConfirm(false)
  }

  return (
    <AppShell>
      <PageHeader
        title="Launch a proposal with minimal friction."
        subtitle="Create a permissionless vote, preview the public summary, and send it to Base."
      />

      <section className="panel mb-4 rounded-panel p-4">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Proposal title</p>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Fund local governance tooling"
            className="mt-3 h-14 w-full rounded-[16px] border border-white/10 bg-white/5 px-4 text-base text-text outline-none placeholder:text-muted"
          />
        </div>

        <div className="mb-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">Options</p>
            <button type="button" onClick={addOption} className="text-sm font-semibold text-primary">
              Add option
            </button>
          </div>
          <div className="space-y-3">
            {options.map((option, index) => (
              <input
                key={`${index}-${option}`}
                value={option}
                onChange={(event) => updateOption(index, event.target.value)}
                className="h-12 w-full rounded-[14px] border border-white/10 bg-white/5 px-4 text-sm text-text outline-none"
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Start time</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {startDelayChoices.map((choice) => (
              <button
                key={choice}
                type="button"
                onClick={() => setStartDelay(choice)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  startDelay === choice ? 'bg-white text-slate-950' : 'bg-white/5 text-muted'
                }`}
              >
                {choice === 0 ? 'Now' : `${choice}m`}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Duration</p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {durationChoices.map((choice) => (
              <button
                key={choice}
                type="button"
                onClick={() => setDurationHours(choice)}
                className={`rounded-[14px] px-3 py-3 text-sm font-semibold ${
                  durationHours === choice ? 'bg-primary text-white' : 'bg-white/5 text-muted'
                }`}
              >
                {choice}h
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="panel mb-4 rounded-panel p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-text">
          <Sparkles className="h-4 w-4 text-warning" />
          Preview summary
        </div>
        <div className="grid gap-3">
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-muted">Live window</p>
            <p className="mt-1 text-sm font-semibold">
              Starts in {startDelay === 0 ? '0m' : `${startDelay}m`} and stays open for {durationHours}h
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-muted">Fee hint</p>
            <p className="mt-1 text-sm font-semibold">Low gas, no token gating, one transaction to create</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-xs text-muted">Metadata payload</p>
            <p className="mt-1 break-all text-sm font-medium">{payload}</p>
          </div>
        </div>
      </section>

      <button
        type="button"
        disabled={!canSubmit}
        onClick={() => setShowConfirm(true)}
        className="w-full rounded-[18px] bg-white px-4 py-4 text-base font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Create proposal
      </button>

      {showConfirm ? (
        <div className="fixed inset-0 z-50 flex items-end bg-slate-950/60 p-4">
          <div className="panel mx-auto w-full max-w-[408px] rounded-[24px] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">Create proposal</p>
            <h3 className="mt-2 text-xl font-semibold text-text">{title || 'Untitled proposal'}</h3>
            <p className="mt-2 text-sm text-muted">
              This submits a permissionless proposal to {CONTRACT_ADDRESS}.
            </p>
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
                onClick={handleCreate}
                className="rounded-[16px] bg-white px-4 py-3 font-semibold text-slate-950"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {(isPending || receipt.isLoading || receipt.isSuccess || submitting) ? (
        <div className="fixed inset-x-4 bottom-24 z-50 mx-auto flex max-w-[408px] items-center gap-3 rounded-[18px] border border-white/10 bg-surface/95 px-4 py-4 shadow-soft">
          {(isPending || receipt.isLoading) ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-accent" />}
          <span className="text-sm text-text">
            {receipt.isSuccess
              ? 'Proposal transaction confirmed on Base.'
              : 'Preparing or submitting proposal transaction...'}
          </span>
        </div>
      ) : null}
    </AppShell>
  )
}
