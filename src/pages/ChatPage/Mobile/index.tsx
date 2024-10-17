import useConnectWallet from "@hooks/useConnectWallet"
import MyPrivateAgentContent from "../ChatBox/RightContent/MyPrivateAgentContent"

const ChatPageMobile = () => {
  const { loading, connectWallet } = useConnectWallet()

  return (
    <div className="min-h-[calc(100dvh-110px)] bg-mercury-30 font-barlow">
      <div className="h-[calc(100dvh-110px)] w-full">
        <MyPrivateAgentContent
          connectWalletLoading={loading}
          connectWallet={connectWallet}
        />
      </div>
    </div>
  )
}

export default ChatPageMobile
