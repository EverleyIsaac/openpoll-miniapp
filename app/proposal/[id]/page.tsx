import { notFound } from 'next/navigation'
import { ProposalDetailPage } from '@/components/proposal-detail-page'
import { getProposalById } from '@/lib/mockData'

export default function ProposalPage({ params }: { params: { id: string } }) {
  const proposal = getProposalById(Number(params.id))

  if (!proposal) {
    notFound()
  }

  return <ProposalDetailPage proposal={proposal} />
}
