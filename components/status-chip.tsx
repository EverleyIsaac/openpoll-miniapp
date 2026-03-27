import { statusClasses, statusLabel } from '@/lib/utils'
import type { ProposalStatus } from '@/lib/types'

export function StatusChip({ status }: { status: ProposalStatus }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses(status)}`}>
      {statusLabel(status)}
    </span>
  )
}
