import useInviteUser from "@hooks/useInviteUser"
import { ChatMessageProvider } from "providers/MessageProvider"
import ChatBox from "./ChatBox"
import ChatHeader from "./ChatHeader"

const ChatPage = () => {
  // const { isDesktop } = useWindowSize()
  useInviteUser()

  return (
    <div className="bg-white font-barlow">
      <ChatHeader />
      {/* {isDesktop ? (
        <div className="h-[calc(100dvh-54px)] w-full">
          <ChatMessageProvider>
            <ChatBox />
          </ChatMessageProvider>
        </div>
      ) : (
        <OnlySupportDesktop />
      )} */}
      <div className="h-[calc(100dvh-54px)] w-full">
        <ChatMessageProvider>
          <ChatBox />
        </ChatMessageProvider>
      </div>
    </div>
  )
}

export default ChatPage
