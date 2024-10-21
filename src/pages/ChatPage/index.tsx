import useWindowSize from "@hooks/useWindowSize"
import { ChatMessageProvider } from "providers/MessageProvider"
import ChatBox from "./ChatBox"
import ChatHeader from "./ChatHeader"
import ChatPageMobile from "./Mobile"

const ChatPage = () => {
  const { isMobile } = useWindowSize()

  return isMobile ? (
    <ChatMessageProvider>
      <ChatPageMobile />
    </ChatMessageProvider>
  ) : (
    <div className="bg-white font-barlow">
      <ChatHeader />
      <div className="mx-auto h-[calc(100dvh-54px)] w-full max-w-[calc(100%-30px)]">
        <ChatMessageProvider>
          <ChatBox />
        </ChatMessageProvider>
      </div>
    </div>
  )
}

export default ChatPage
