import { desktopPrivateAgent } from "@assets/images"
import { envConfig } from "@configs/env"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { checkGroupDirect, createGroupChat } from "services/chat"
import CreatePrivateAgent from "./CreatePrivateAgent"
import PrivateAgentChatContent from "./PrivateAgentChatContent"
import usePrivateAgent, { PRIVATE_AGENT_STATUS } from "./usePrivateAgent"

const MyPrivateAgentContent: React.FC<{
  connectWalletLoading: boolean
  connectWallet: any
}> = ({ connectWalletLoading, connectWallet }) => {
  const groupDefaultForPrivateAgent = envConfig.groupDefaultForPrivateAgent
  const { privateAgentData, callGetMyPrivateAgent, loading } = usePrivateAgent()
  const { isLogin } = useAuthState()
  const navigate = useNavigate()
  const [isCreated, setCreated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { pathname } = useLocation()

  const privateAgentStatus = privateAgentData?.status
  const privateAgentId = privateAgentData?.id
  const MAP_MEMBER_ID_FROM_STATUS = {
    [PRIVATE_AGENT_STATUS.PENDING]: groupDefaultForPrivateAgent,
    [PRIVATE_AGENT_STATUS.ACTIVE]: privateAgentId,
  }
  const memberId = MAP_MEMBER_ID_FROM_STATUS[privateAgentStatus]

  const checkCreatedGroupAgent = async () => {
    if (!memberId) return
    setIsLoading(true)
    try {
      const res = await checkGroupDirect({
        members: [memberId],
      })
      const groupId = res?.data?.group?.id
      if (!groupId) {
        const createGroupResponse = await createGroupChat({
          members: [memberId],
        })
        const newGroupId = createGroupResponse?.data?.groupId
        if (newGroupId) {
          navigate(`${PATH_NAMES.PRIVATE_AGENT}/${newGroupId}`)
        }
        return
      }
      return navigate(`${PATH_NAMES.PRIVATE_AGENT}/${groupId}`)
    } catch (error) {
      console.log(error, "error")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    callGetMyPrivateAgent()
    checkCreatedGroupAgent()
  }, [isLogin, isCreated, privateAgentStatus, pathname])

  if (loading || isLoading) return

  if (privateAgentData && !isLoading) return <PrivateAgentChatContent />

  return (
    <div
      className="relative mx-auto h-full w-full flex-1 rounded-[22px] border border-white bg-white bg-cover bg-center bg-no-repeat font-barlow"
      style={{
        backgroundImage: `url(${desktopPrivateAgent})`,
      }}
    >
      <CreatePrivateAgent
        connectWalletLoading={connectWalletLoading}
        connectWallet={connectWallet}
        setCreated={setCreated}
      />
    </div>
  )
}
export default MyPrivateAgentContent
