import ChatMessages from "@pages/ChatPage/ChatBox/ChatMessages"
import ChatDetailHeader from "./Header"
import ChatInput from "@pages/ChatPage/ChatBox/ChatInput"
import { useParams } from "react-router-dom"
import useAuthState from "@hooks/useAuthState"

const ChatDetail = () => {
  const { chatId, privateChatId } = useParams()
  const { isLogin } = useAuthState()
  const isEnableTextInput = isLogin && (privateChatId || chatId)

  return (
    <div className="h-[100dvh] pt-[50px]">
      <ChatDetailHeader />
      <div className="h-[calc(100dvh-127px)]">
        <ChatMessages />
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-mercury-30 px-4 py-2">
        <ChatInput isDisabledInput={!isEnableTextInput} />
      </div>
    </div>
  )
}

export default ChatDetail
