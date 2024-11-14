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
    <MainContainerCreate botId={botId} onCallBack={onCallBack}>
      <ConnectData />
    </MainContainerCreate>
  )
}

export default AddMyData
