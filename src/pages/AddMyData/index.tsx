import { desktopPrivateAgent } from "@assets/images"
import useConnectWallet from "@hooks/useConnectWallet"
import CreatePrivateAgent from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/CreatePrivateAgent"

const AddMyData = () => {
  const { loading, connectWallet } = useConnectWallet()

  return (
    <div
      className="relative mx-auto h-full w-full flex-1 rounded-[22px] border border-white bg-white bg-cover bg-center bg-no-repeat font-barlow"
      style={{
        backgroundImage: `url(${desktopPrivateAgent})`,
      }}
    >
      <CreatePrivateAgent
        connectWalletLoading={loading}
        connectWallet={connectWallet}
      />
    </div>
  )
}

export default AddMyData
