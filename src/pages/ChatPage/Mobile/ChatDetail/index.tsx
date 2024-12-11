import useAuthState from "@hooks/useAuthState"
import useSubmitChat from "@hooks/useSubmitChat"
import ChatInput from "@pages/ChatPage/ChatBox/ChatInput"
import ChatMessages from "@pages/ChatPage/ChatBox/ChatMessages"
import PrivateAgentChatContent from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/PrivateAgentChatContent"
import { useQuery } from "@tanstack/react-query"
import { StyleSpacingProvider } from "providers/StyleSpacingProvider"
import { useParams } from "react-router-dom"
import SpeechRecognition from "react-speech-recognition"
import { QueryDataKeys } from "types/queryDataKeys"
import ChatDetailHeader from "./Header"
import useGetChatId from "./useGetChatId"

const ChatDetail = () => {
  const { privateChatId } = useParams()
  const { chatId } = useGetChatId()
  const { isLogin } = useAuthState()
  const groupId = chatId || privateChatId
  const { mutation } = useSubmitChat({
    groupId: groupId,
    callbackDone: SpeechRecognition.stopListening,
  })
  const { data: isChatting } = useQuery<boolean>({
    initialData: false,
    queryKey: [QueryDataKeys.IS_CHATTING, groupId],
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
            onSubmit={(messageValue) =>
              mutation.mutate({ message: messageValue })
            }
            isPending={mutation.isPending}
            isDisabledInput={isChatting || !isEnableTextInput}
          />
        </div>
      </div>
    </StyleSpacingProvider>
  )
}

export default ChatDetail
