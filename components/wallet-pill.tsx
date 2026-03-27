'use client'

import { Loader2, LogOut, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { base } from 'wagmi/chains'
import { shortenAddress } from '@/lib/utils'

export function WalletPill() {
  const { address, isConnected, chainId } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChainAsync } = useSwitchChain()
  const [ready, setReady] = useState(false)

  useEffect(() => setReady(true), [])

  const handleConnect = () => {
    const preferred =
      connectors.find((connector) => connector.name.toLowerCase().includes('coinbase')) ??
      connectors[0]

    if (preferred) {
      connect({ connector: preferred })
    }
  }

  const handleSwitch = async () => {
    if (chainId !== base.id) {
      await switchChainAsync({ chainId: base.id })
    }
  }

  if (!ready) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted">
        <Loader2 className="h-4 w-4 animate-spin" />
        Wallet
      </div>
    )
  }

  if (!isConnected) {
    return (
      <button
        type="button"
        onClick={handleConnect}
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wallet className="h-4 w-4" />}
        Connect
      </button>
    )
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-2 text-sm">
      <button
        type="button"
        onClick={handleSwitch}
        className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary"
      >
        {chainId === base.id ? 'Base Ready' : 'Switch Base'}
      </button>
      <span className="text-text">{shortenAddress(address)}</span>
      <button
        type="button"
        onClick={() => disconnect()}
        className="rounded-full p-2 text-muted transition hover:bg-white/5 hover:text-text"
        aria-label="Disconnect wallet"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  )
}
