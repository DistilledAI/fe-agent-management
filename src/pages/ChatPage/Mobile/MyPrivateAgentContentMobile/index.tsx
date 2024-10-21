import useConnectWallet from "@hooks/useConnectWallet"
import MyPrivateAgentContent from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent"

const MyPrivateAgentContentMobile: React.FC = () => {
  const { loading, connectWallet } = useConnectWallet()

  return (
    <div className="h-[calc(100dvh-100px)]">
      <MyPrivateAgentContent
        connectWalletLoading={loading}
        connectWallet={connectWallet}
      />
    </div>
  )
}
export default MyPrivateAgentContentMobile
