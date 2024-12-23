import { desktopPrivateAgent } from "@assets/images"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import useConnectWallet from "@hooks/useConnectWallet"
import { Button } from "@nextui-org/react"

const ConnectWallet = () => {
  const { loading, connectMultipleWallet } = useConnectWallet()

  return (
    <div
      className="relative mx-auto flex h-dvh w-full items-center justify-center rounded-[22px] border border-white bg-white bg-cover bg-center bg-no-repeat font-barlow max-md:h-[calc(100dvh-50px)]"
      style={{
        backgroundImage: `url(${desktopPrivateAgent})`,
      }}
    >
      <div className="flex w-[400px] max-w-full flex-col items-center rounded-[22px] border border-mercury-70 bg-mercury-30 p-4 md:p-6">
        <div className="flex items-center gap-2 md:flex-col">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FC0] md:h-10 md:w-10">
            <FilledBrainAIIcon color="#363636" size={24} />
          </div>
          <h3 className="my-2 text-20 font-semibold text-mercury-950 md:text-24">
            Start your own Private agent
          </h3>
        </div>
        <h4 className="text-center text-14 text-mercury-800 md:text-16">
          Your <span className="font-bold">private agents</span>. Built with
          your <span className="font-bold">private data</span>. Protected by
          your <span className="font-bold">private key</span>.
        </h4>
        <Button
          className="mt-4 h-[56px] w-full rounded-full bg-mercury-950 text-[18px] text-mercury-30 md:mt-6"
          onClick={connectMultipleWallet}
          isLoading={loading}
        >
          Connect Wallet
        </Button>
      </div>
    </div>
  )
}

export default ConnectWallet
