import useWindowSize from "@hooks/useWindowSize"
import ChatPageMobile from "./Mobile"

const ChatPage = () => {
  const { isMobile } = useWindowSize()

  return isMobile ? <ChatPageMobile /> : <></>
}

export default ChatPage
