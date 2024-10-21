import MainLayout from "@components/Layout/MainLayout"
import { PATH_NAMES } from "@constants/index"
import useInviteUser from "@hooks/useInviteUser"
import useWindowSize from "@hooks/useWindowSize"
import { useLocation, useParams } from "react-router-dom"
import ChatBox from "./ChatBox"
import ChatHeader from "./ChatHeader"
import ChatPageMobile from "./Mobile"

const ChatPage = () => {
  const { isMobile } = useWindowSize()
  const { pathname } = useLocation()
  const { chatId } = useParams()
  useInviteUser()

  const hasLayout = pathname !== `${PATH_NAMES.CHAT}/${chatId}`

  return (
    <MainLayout isHeader={hasLayout} isFooter={hasLayout}>
      {isMobile ? (
        <ChatPageMobile />
      ) : (
        <div className="bg-white font-barlow">
          <ChatHeader />
          <div className="mx-auto h-[calc(100dvh-54px)] w-full max-w-[calc(100%-30px)]">
            <ChatBox />
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default ChatPage
