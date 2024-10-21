import useWindowSize from "@hooks/useWindowSize"
import ChatBox from "./ChatBox"
import ChatHeader from "./ChatHeader"
import ChatPageMobile from "./Mobile"

const ChatPage = () => {
  const { isMobile } = useWindowSize()

  return isMobile ? (
    <ChatPageMobile />
  ) : (
    <div className="bg-white font-barlow">
      <ChatHeader />
      <div className="mx-auto h-[calc(100dvh-54px)] w-full max-w-[calc(100%-30px)]">
        <ChatBox />
      </div>
    </div>
  )
}

export default ChatPage
