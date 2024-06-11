import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { coinbaseWallet } from '@rainbow-me/rainbowkit/wallets'
import { createConfig, http } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'

const connectors = connectorsForWallets(
  [{ groupName: ' ', wallets: [coinbaseWallet] }],
  {
    appName: 'Smart Wallet Backup',
    projectId: 'c5139a945eac06eeb376312caed6bedb',
  }
)

export const chains = [baseSepolia] as const

export const wagmiConfig = createConfig({
  chains,
  connectors,
  multiInjectedProviderDiscovery: false,
  transports: {
    [baseSepolia.id]: http(),
  },
})
