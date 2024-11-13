import { desktopPrivateAgent } from "@assets/images"
import { PATH_NAMES } from "@constants/index"
import useConnectWallet from "@hooks/useConnectWallet"
import CreatePrivateAgent from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/CreatePrivateAgent"
import { useNavigate, useParams } from "react-router-dom"

const AddMyData = () => {
  const { loading, connectMultipleWallet } = useConnectWallet()
  const { botId } = useParams()
  const navigate = useNavigate()

  const onCallBack = () => {
    navigate(PATH_NAMES.MY_DATA)
  }

  return (
    <div
      className="relative mx-auto h-full w-full flex-1 rounded-[22px] border border-white bg-white bg-cover bg-center bg-no-repeat font-barlow"
      style={{
        backgroundImage: `url(${desktopPrivateAgent})`,
      }}
    >
      <CreatePrivateAgent
        connectWalletLoading={loading}
        connectWallet={connectMultipleWallet}
        botId={botId}
        onCallBack={onCallBack}
      />
    </div>
  )
}

export default AddMyData
