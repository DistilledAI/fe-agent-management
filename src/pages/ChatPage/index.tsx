import MainLayout from "@components/Layout/MainLayout"
import useInviteUser from "@hooks/useInviteUser"
import useWindowSize from "@hooks/useWindowSize"
import { ChatMessageProvider } from "providers/MessageProvider"
import ChatBox from "./ChatBox"
import ChatHeader from "./ChatHeader"
import ChatPageMobile from "./Mobile"
import { useLocation, useParams } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"

const ChatPage = () => {
  const { screenWidth } = useWindowSize()
  const { pathname } = useLocation()
  const { chatId } = useParams()
  useInviteUser()

  const hasLayout = pathname !== `${PATH_NAMES.CHAT}/${chatId}`

  return (
    <MainLayout isHeader={hasLayout} isFooter={hasLayout}>
      {screenWidth < 768 ? (
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
      )}
    </MainLayout>
  )
}

export default ChatPage
