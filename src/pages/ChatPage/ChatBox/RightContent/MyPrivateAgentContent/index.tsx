import DotLoading from "@components/DotLoading"
import useAuthState from "@hooks/useAuthState"
import { useEffect, useState } from "react"
import CreatePrivateAgent from "./CreatePrivateAgent"
import PrivateAgentChatContent from "./PrivateAgentChatContent"
import usePrivateAgent, { PRIVATE_AGENT_STATUS } from "./usePrivateAgent"
import { checkGroupDirect, createGroupChat } from "services/chat"
import { useNavigate } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"

const GROUP_DEFAULT_FOR_PRIVATE_AGENT = 396

const MyPrivateAgentContent: React.FC<{
  connectWalletLoading: boolean
  connectWallet: any
}> = ({ connectWalletLoading, connectWallet }) => {
  const { privateAgentData, callGetMyPrivateAgent, loading } = usePrivateAgent()
  const { isLogin } = useAuthState()
  const navigate = useNavigate()
  const privateAgentStatus = privateAgentData?.status
  const isPending = privateAgentStatus === PRIVATE_AGENT_STATUS.PENDING
  const [isCreated, setCreated] = useState<boolean>(false)

  const checkCreatedGroupAgent = async () => {
    if (isPending) {
      const res = await checkGroupDirect({
        members: [GROUP_DEFAULT_FOR_PRIVATE_AGENT],
      })
      const groupId = res?.data?.group?.id
      if (!groupId) {
        const createGroupResponse = await createGroupChat({
          members: [GROUP_DEFAULT_FOR_PRIVATE_AGENT],
        })
        const newGroupId = createGroupResponse?.data?.id
        if (newGroupId) {
          navigate(`${PATH_NAMES.PRIVATE_AGENT}/${newGroupId}`)
        }
        return
      }
      navigate(`${PATH_NAMES.PRIVATE_AGENT}/${groupId}`)
    }
  }

  useEffect(() => {
    callGetMyPrivateAgent()
    checkCreatedGroupAgent()
  }, [isLogin, isCreated, isPending])

  if (loading)
    return (
      <div
        className={
          "flex h-full flex-1 items-center justify-center overflow-hidden rounded-[22px] border-[2px] border-white bg-mercury-30 p-3 transition-all duration-500 ease-in-out"
        }
      >
        <DotLoading />
      </div>
    )

  if (privateAgentData) return <PrivateAgentChatContent />

  return (
    <CreatePrivateAgent
      connectWalletLoading={connectWalletLoading}
      connectWallet={connectWallet}
      setCreated={setCreated}
    />
  )
}
export default MyPrivateAgentContent
