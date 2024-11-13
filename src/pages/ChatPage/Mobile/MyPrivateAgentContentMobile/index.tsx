import useConnectWallet from "@hooks/useConnectWallet"
import MyPrivateAgentContent from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent"

const MyPrivateAgentContentMobile: React.FC = () => {
  const { loading, connectMultipleWallet } = useConnectWallet()

  return (
    <div className="h-[calc(100dvh-100px)]">
      <MyPrivateAgentContent
        connectWalletLoading={loading}
        connectWallet={connectMultipleWallet}
      />
    </div>
  )
}
export default MyPrivateAgentContentMobile
