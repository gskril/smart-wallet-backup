import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { isAddress, parseAbi } from 'viem'
import {
  useAccount,
  useChainId,
  useDisconnect,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'

import { Banner } from './components/Banner'
import { Button } from './components/Button'
import { isSupportedChain } from './lib/utils'

export default function App() {
  const chainId = useChainId()
  const tx = useWriteContract()
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { openChainModal } = useChainModal()
  const { openConnectModal } = useConnectModal()
  const receipt = useWaitForTransactionReceipt({ hash: tx.data })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const inputValue = event.currentTarget.input.value

    if (!address) return alert('No address found')
    if (!isAddress(inputValue)) return alert('Invalid input')

    tx.writeContract({
      address,
      abi: parseAbi(['function addOwnerAddress(address owner)']),
      functionName: 'addOwnerAddress',
      args: [inputValue],
    })
  }

  return (
    <div className="bg-custom-800">
      <Banner />

      <main className="mx-auto grid max-w-5xl items-center gap-6 p-6 sm:h-[calc(100svh-5.5rem)] sm:grid-cols-2 md:grid-cols-[3fr,2fr]">
        <img
          alt="Smart Wallet Animation"
          className="w-full rounded-2xl"
          src="/animation.gif"
        />

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold">Smart Wallet Backup</h1>

          <span className="text-custom-100 leaning-[1.5] mb-5 mt-2 text-lg">
            Add a backup signer to your Smart Wallet in case something goes
            wrong with the passkey.
          </span>

          {address && !tx.data && (
            <input
              className="bg-custom-700 border-custom-100 mb-3 rounded-lg border p-2 px-3"
              placeholder="ETH address"
              name="input"
            />
          )}

          <div className="flex flex-col gap-2 sm:flex-row">
            {(() => {
              if (receipt.isSuccess) {
                return <Button>Success</Button>
              }

              if (receipt.isError) {
                return <Button>Transaction Failed</Button>
              }

              if (tx.data) {
                return <Button>Processing...</Button>
              }

              if (!address) {
                return (
                  <Button onClick={() => openConnectModal?.()}>
                    Connect Wallet
                  </Button>
                )
              }

              if (!isSupportedChain(chainId)) {
                return (
                  <Button onClick={() => openChainModal?.()}>
                    Switch to Supported Network
                  </Button>
                )
              }

              return (
                <>
                  <Button type="submit">Add Signer</Button>

                  <Button variant="secondary" onClick={() => disconnect()}>
                    Disconnect
                  </Button>
                </>
              )
            })()}
          </div>
        </form>
      </main>
    </div>
  )
}
