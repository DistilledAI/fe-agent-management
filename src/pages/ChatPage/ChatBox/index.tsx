import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ChatInput from "./ChatInput"
import ChatMessages from "./ChatMessages"
import MyPrivateAgentContent from "./RightContent/MyPrivateAgentContent"
import { StyleSpacingProvider } from "providers/StyleSpacingProvider"

const ChatBox = () => {
  const { loading, connectWallet } = useConnectWallet()
  const { chatId, inviteUserId } = useParams()
  const { isLogin } = useAuthState()
  const { privateChatId } = useParams()
  const navigate = useNavigate()

  const isEnableTextInput = isLogin && (privateChatId || chatId)

  useEffect(() => {
    if (chatId && !isLogin) navigate("/")
  }, [isLogin, chatId])

  return (
    <StyleSpacingProvider>
      <div className="relative h-full max-h-dvh w-full">
        {(isLogin && chatId) || inviteUserId ? (
          <>
            <ChatMessages />
            <ChatInput
              isDisabledInput={!isEnableTextInput}
              wrapperClassName="left-1/2 -translate-x-1/2 w-[calc(100%-32px)]"
            />
          </>
        ) : (
          <MyPrivateAgentContent
            connectWalletLoading={loading}
            connectWallet={connectWallet}
          />
        )}
      </div>
    </StyleSpacingProvider>
  )
}

export default ChatBox
