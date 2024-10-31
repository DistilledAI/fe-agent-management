import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ChatInput from "./ChatInput"
import ChatMessages from "./ChatMessages"
import MyPrivateAgentContent from "./RightContent/MyPrivateAgentContent"
import { StyleSpacingProvider } from "providers/StyleSpacingProvider"
import useSubmitChat from "@hooks/useSubmitChat"
import SpeechRecognition from "react-speech-recognition"

const ChatBox = () => {
  const { loading, connectWallet } = useConnectWallet()
  const { chatId, inviteUserId, privateChatId } = useParams()
  const { isLogin } = useAuthState()
  const navigate = useNavigate()
  const groupId = privateChatId || chatId
  const { mutation } = useSubmitChat(groupId, SpeechRecognition.stopListening)

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
              onSubmit={mutation.mutate}
              isPending={mutation.isPending}
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
