import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ChatInput from "./ChatInput"
import ChatMessages from "./ChatMessages"
import MyPrivateAgentContent from "./RightContent/MyPrivateAgentContent"
import useMessageSocket from "./useMessageSocket"

const ChatBox = () => {
  const { loading, connectWallet } = useConnectWallet()
  const { chatId, inviteUserId } = useParams()
  const { isLogin } = useAuthState()
  const { privateChatId } = useParams()
  const navigate = useNavigate()

  useMessageSocket()
  const isEnableTextInput = isLogin && (privateChatId || chatId)

  useEffect(() => {
    if (chatId && !isLogin) navigate("/")
  }, [isLogin, chatId, navigate])

  return (
    <div className="relative mx-auto h-full max-h-[calc(100%-44px)] w-full max-w-[768px]">
      {(isLogin && chatId) || inviteUserId ? (
        <ChatMessages />
      ) : (
        <MyPrivateAgentContent
          connectWalletLoading={loading}
          connectWallet={connectWallet}
        />
      )}
      <ChatInput isDisabledInput={!isEnableTextInput} />
    </div>
  )
}

export default ChatBox
