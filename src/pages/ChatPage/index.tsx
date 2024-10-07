import useWindowSize from "@hooks/useWindowSize"
import ChatBox from "./ChatBox"
import ChatHeader from "./ChatHeader"
import OnlySupportDesktop from "./OnlySupportDesktop"
import { ChatMessageProvider } from "providers/MessageProvider"
import useInviteUser from "@hooks/useInviteUser"

const ChatPage = () => {
  const { isDesktop } = useWindowSize()
  useInviteUser()

  return (
    <div className="bg-white font-barlow">
      <ChatHeader />
      {isDesktop ? (
        <div className="h-[calc(100dvh-54px)] w-full">
          <ChatMessageProvider>
            <ChatBox />
          </ChatMessageProvider>
        </div>
      ) : (
        <OnlySupportDesktop />
      )}
    </div>
  )
}

export default ChatPage
