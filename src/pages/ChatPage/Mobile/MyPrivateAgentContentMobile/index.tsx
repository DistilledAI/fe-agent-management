import MainLayout from "@components/Layout/MainLayout"
import useConnectWallet from "@hooks/useConnectWallet"
import MyPrivateAgentContent from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent"

const MyPrivateAgentContentMobile: React.FC = () => {
  const { loading, connectWallet } = useConnectWallet()

  return (
    <MainLayout>
      <div className="h-[calc(100dvh-100px)]">
        <MyPrivateAgentContent
          connectWalletLoading={loading}
          connectWallet={connectWallet}
        />
      </div>
    </MainLayout>
  )
}
export default MyPrivateAgentContentMobile
