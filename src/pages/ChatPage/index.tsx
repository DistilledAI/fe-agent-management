import MainLayout from "@components/Layout/MainLayout"
import useInviteUser from "@hooks/useInviteUser"
import useWindowSize from "@hooks/useWindowSize"
import { ChatMessageProvider } from "providers/MessageProvider"
import ChatBox from "./ChatBox"
import ChatHeader from "./ChatHeader"
import ChatPageMobile from "./Mobile"

const ChatPage = () => {
  const { screenWidth } = useWindowSize()
  useInviteUser()

  return (
    <MainLayout>
      {screenWidth < 768 ? (
        <ChatPageMobile />
      ) : (
        <div className="bg-white font-barlow">
          <ChatHeader />
          <div className="mx-auto h-[calc(100dvh-54px)] w-full max-w-[calc(100%-30px)]">
            <ChatMessageProvider>
              <ChatBox />
            </ChatMessageProvider>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default ChatPage
