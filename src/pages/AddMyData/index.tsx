import { desktopPrivateAgent } from "@assets/images"
import { PATH_NAMES } from "@constants/index"
import ConnectData from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/AgentInitialization/ConnectData"
import MainContainerCreate from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/MainContainerCreate"
import { useNavigate, useParams } from "react-router-dom"

const AddMyData = () => {
  // const { loading, connectWallet } = useConnectWallet()
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
      <MainContainerCreate botId={botId} onCallBack={onCallBack}>
        <ConnectData />
      </MainContainerCreate>
    </div>
  )
}

export default AddMyData
