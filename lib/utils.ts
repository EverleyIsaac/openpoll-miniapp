import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Proposal } from '@/lib/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortenAddress(address?: string) {
  if (!address) return 'Guest'
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(value)
}

export function getTimeLeft(endsAt: string) {
  const diff = new Date(endsAt).getTime() - Date.now()
  if (diff <= 0) return 'Ended'

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d ${hours % 24}h left`
  if (hours > 0) return `${hours}h ${minutes}m left`
  return `${minutes}m left`
}

export function statusLabel(status: Proposal['status']) {
  if (status === 'active') return 'Active'
  if (status === 'pending') return 'Pending'
  return 'Ended'
}

export function statusClasses(status: Proposal['status']) {
  if (status === 'active') return 'bg-accent/15 text-accent'
  if (status === 'pending') return 'bg-warning/15 text-warning'
  return 'bg-muted/15 text-muted'
}

export function leadingOption(proposal: Proposal) {
  return [...proposal.options].sort((a, b) => b.votes - a.votes)[0]
}

export function toBase64Url(input: string) {
  if (typeof window === 'undefined') {
    return Buffer.from(input).toString('base64url')
  }
  return btoa(unescape(encodeURIComponent(input)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}
