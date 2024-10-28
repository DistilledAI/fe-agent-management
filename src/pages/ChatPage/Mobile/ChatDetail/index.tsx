import useAuthState from "@hooks/useAuthState"
import ChatInput from "@pages/ChatPage/ChatBox/ChatInput"
import ChatMessages from "@pages/ChatPage/ChatBox/ChatMessages"
import { useParams } from "react-router-dom"
import ChatDetailHeader from "./Header"

const ChatDetail = () => {
  const { chatId, privateChatId } = useParams()
  const { isLogin } = useAuthState()

  const isEnableTextInput = isLogin && (privateChatId || chatId)

  return (
    <div className="h-[100dvh] pt-[60px]">
      <ChatDetailHeader />
      <div className="h-[calc(100dvh-130px)]">
        <ChatMessages />
      </div>
      <div className="fixed bottom-0 left-0 z-[1] w-full bg-mercury-30 px-3 py-2">
        <ChatInput isDisabledInput={!isEnableTextInput} />
      </div>
    </div>
  )
}

export default ChatDetail
