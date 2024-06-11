import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { chains } from './web3'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isSupportedChain(chainId: number) {
  const supportedChainIds = chains.map((chain) => chain.id) as number[]
  return supportedChainIds.includes(chainId)
}
