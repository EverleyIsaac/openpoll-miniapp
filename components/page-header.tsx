import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { WalletPill } from '@/components/wallet-pill'

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  backHref,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  backHref?: string
}) {
  return (
    <header className="mb-5 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        {backHref ? (
          <Link
            href={backHref}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        ) : (
          <div className="text-xs uppercase tracking-[0.28em] text-muted">{eyebrow}</div>
        )}
        <WalletPill />
      </div>
      <div>
        <h1 className="text-[28px] font-semibold tracking-tight text-text">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-muted">{subtitle}</p> : null}
      </div>
    </header>
  )
}
