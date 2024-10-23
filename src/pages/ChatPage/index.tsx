import useWindowSize from "@hooks/useWindowSize"
import ChatPageMobile from "./Mobile"
import ChatPageDesktop from "./Desktop"
import useFetchMe from "@hooks/useFetchMe"
import useInviteUser from "@hooks/useInviteUser"

const ChatPage = () => {
  const { isMobile } = useWindowSize()
  useInviteUser()
  useFetchMe()

  return isMobile ? <ChatPageMobile /> : <ChatPageDesktop />
}

export default ChatPage
