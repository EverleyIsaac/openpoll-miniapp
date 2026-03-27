'use client'

import { createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { coinbaseWallet } from '@wagmi/connectors'
import { injected } from '@wagmi/core'

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [coinbaseWallet({ appName: 'OpenPoll' }), injected()],
  transports: {
    [base.id]: http(),
  },
})
