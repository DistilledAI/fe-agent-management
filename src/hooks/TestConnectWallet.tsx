import { Button } from "@nextui-org/react"
import { useEffect, useState } from "react"

type DisplayEncoding = "utf8" | "hex"
type PhantomEvent = "disconnect" | "connect"
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage"

interface ConnectOpts {
  onlyIfTrusted: boolean
}

interface PhantomProvider {
  publicKey: any | null
  isConnected: boolean | null
  autoApprove: boolean | null
  signTransaction: (transaction: any) => Promise<any>
  signAllTransactions: (transactions: any[]) => Promise<any[]>
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding,
  ) => Promise<any>
  connect: (opts?: Partial<ConnectOpts>) => Promise<void>
  disconnect: () => Promise<void>
  on: (event: PhantomEvent, handler: (args: any) => void) => void
  request: (method: PhantomRequestMethod, params: any) => Promise<any>
}

const getProvider = (): PhantomProvider | undefined => {
  if ("solana" in window) {
    const provider = (window as any).solana
    if (provider.isPhantom) {
      return provider
    }
  }
  window.open("https://phantom.app/", "_blank")
}

const Wallet = () => {
  const [signed, setSigned] = useState("")
  const [text] = useState("")
  const provider = getProvider()
  console.log(provider, "provider")
  const [logs, setLogs] = useState<string[]>([])
  const addLog = (log: string) => setLogs([...logs, log])
  const [, setConnected] = useState<boolean>(false)

  useEffect(() => {
    if (provider) {
      provider.on("connect", () => {
        setConnected(true)
        addLog("Connected to wallet " + provider.publicKey?.toBase58())
      })
      provider.on("disconnect", () => {
        setConnected(false)
        addLog("Disconnected from wallet")
      })
      // try to eagerly connect
      provider.connect({ onlyIfTrusted: true })
      return () => {
        provider.disconnect()
      }
    }
  }, [provider])

  if (!provider) {
    return <h2>Could not find a provider</h2>
  }

  const signMessage = async () => {
    const data = new TextEncoder().encode(text)
    const signedMessage = await provider.signMessage(data)
    console.log(signedMessage)
    setSigned(signedMessage.signature.toString())
    addLog("Message signed")
  }

  return (
    <div>
      {provider && provider.publicKey ? (
        <div>
          <span>
            Public key:{" "}
            {provider.publicKey?.toBase58()
              ? provider.publicKey?.toBase58()
              : ""}
          </span>

          <span>Sign: {signed}</span>

          <button onClick={() => signMessage()}>Sign</button>
        </div>
      ) : (
        <>
          <Button onClick={() => provider.connect()}>Connect to Phantom</Button>
        </>
      )}
    </div>
  )
}

export default Wallet
