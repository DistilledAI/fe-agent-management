import DotLoading from "@components/DotLoading"
import useAuthState from "@hooks/useAuthState"
import { useEffect, useState } from "react"
import CreatePrivateAgent from "./CreatePrivateAgent"
import PrivateAgentChatContent from "./PrivateAgentChatContent"
import usePrivateAgent from "./usePrivateAgent"

const MyPrivateAgentContent: React.FC<{
  connectWalletLoading: boolean
  connectWallet: any
}> = ({ connectWalletLoading, connectWallet }) => {
  const { privateAgentData, callGetMyPrivateAgent, loading } = usePrivateAgent()
  const { isLogin } = useAuthState()
  const privateAgentStatus = privateAgentData?.status
  // const isPending = privateAgentStatus === PRIVATE_AGENT_STATUS.PENDING
  const [isCreated, setCreated] = useState<boolean>(false)

  useEffect(() => {
    callGetMyPrivateAgent()
  }, [isLogin, isCreated])

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

  if (!!privateAgentStatus) return <PrivateAgentChatContent />

  return (
    <CreatePrivateAgent
      connectWalletLoading={connectWalletLoading}
      connectWallet={connectWallet}
      setCreated={setCreated}
    />
  )
}
export default MyPrivateAgentContent
