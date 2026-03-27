export const APP_NAME = 'OpenPoll'
export const APP_TAGLINE = 'Permissionless community votes on Base'
export const APP_DESCRIPTION =
  'Open governance mini app for proposal creation, live voting, and transparent onchain results.'
export const CONTRACT_ADDRESS = '0x7b9381D03c76a96097aCeEce4e2519EF905c1901' as const

export const BASE_APP_ID = '69c35d546d153fb47b06ad9f'
export const TALENTAPP_VERIFICATION =
  '55d7fa9c8e3b301d0ffcaf2a4802fd02b3f68f501f23320c0f8ab48514c291c9022887283668395a81853e14a128de05b6778884f022360644f9869df6ad17a3'

export const BUILDER_CODE =
  process.env.NEXT_PUBLIC_BASE_BUILDER_CODE ?? 'bc_x9alsfm3'
export const BUILDER_CODE_ENCODED =
  process.env.NEXT_PUBLIC_BASE_BUILDER_CODE_ENCODED ??
  '0x62635f7839616c73666d330b0080218021802180218021802180218021'

export const APP_URL = 'https://openpoll-miniapp.vercel.app'

export const openPollAbi = [
  {
    type: 'function',
    stateMutability: 'nonpayable',
    name: 'createProposal',
    inputs: [
      { name: 'startDelay', type: 'uint64' },
      { name: 'duration', type: 'uint64' },
      { name: 'optionCount', type: 'uint8' },
      { name: 'ipfsHash', type: 'string' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    name: 'updateStatus',
    inputs: [{ name: 'id', type: 'uint256' }],
    outputs: [],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    name: 'vote',
    inputs: [
      { name: 'id', type: 'uint256' },
      { name: 'option', type: 'uint8' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    name: 'getVotes',
    inputs: [{ name: 'id', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256[]' }],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    name: 'cancel',
    inputs: [{ name: 'id', type: 'uint256' }],
    outputs: [],
  },
] as const
