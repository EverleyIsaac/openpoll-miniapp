'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CirclePlus, House, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/', label: 'Proposals', icon: House },
  { href: '/create', label: 'Create', icon: CirclePlus },
  { href: '/me', label: 'Me', icon: UserRound },
]

export function AppShell({
  children,
  cta,
}: {
  children: React.ReactNode
  cta?: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <>
      <main className="app-shell">{children}</main>
      {cta}
      <nav className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-24px)] max-w-[408px] -translate-x-1/2 items-center justify-between rounded-[20px] border border-white/10 bg-surface/95 px-3 py-2 shadow-soft backdrop-blur">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const active = tab.href === '/' ? pathname === tab.href : pathname.startsWith(tab.href)

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex min-w-[96px] flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-3 text-xs font-semibold transition',
                active ? 'bg-white text-slate-950' : 'text-muted hover:text-text',
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
