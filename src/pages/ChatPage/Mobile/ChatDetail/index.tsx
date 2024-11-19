import useAuthState from "@hooks/useAuthState"
import useSubmitChat from "@hooks/useSubmitChat"
import ChatInput from "@pages/ChatPage/ChatBox/ChatInput"
import { StyleSpacingProvider } from "providers/StyleSpacingProvider"
import { useParams } from "react-router-dom"
import SpeechRecognition from "react-speech-recognition"
import ChatDetailHeader from "./Header"
import useGetChatId from "./useGetChatId"
import PrivateAgentChatContent from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/PrivateAgentChatContent"
import ChatMessages from "@pages/ChatPage/ChatBox/ChatMessages"
import { useQuery } from "@tanstack/react-query"

const ChatDetail = () => {
  const { privateChatId } = useParams()
  const { chatId } = useGetChatId()
  const { isLogin } = useAuthState()
  const groupId = chatId || privateChatId
  const { mutation } = useSubmitChat(groupId, SpeechRecognition.stopListening)
  const { data: isChatting } = useQuery<boolean>({
    initialData: false,
    queryKey: ["isChatting", groupId],
    enabled: !!groupId,
  })

  const isEnableTextInput = isLogin && (privateChatId || chatId)

  return (
    <StyleSpacingProvider>
      <div className="h-[100dvh] pt-[60px]">
        <ChatDetailHeader />
        <div className="h-[calc(100dvh-130px)]">
          {privateChatId ? (
            <PrivateAgentChatContent hasInputChat={false} />
          ) : (
            <ChatMessages />
          )}
        </div>
        <div className="fixed bottom-0 left-0 z-[11] w-full bg-mercury-30 px-3 py-2">
          <ChatInput
            onSubmit={mutation.mutate}
            isPending={mutation.isPending}
            isDisabledInput={isChatting || !isEnableTextInput}
          />
        </div>
      </div>
    </StyleSpacingProvider>
  )
}

export default ChatDetail
