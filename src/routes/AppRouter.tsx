import MainLayout from "@components/Layout/MainLayout"
import { ChatDetailLoadingPage } from "@components/LoadingMobile"
import { PATH_NAMES } from "@constants/index"
import useWindowSize from "@hooks/useWindowSize"
import ChatPage from "@pages/ChatPage"
import ChatBox from "@pages/ChatPage/ChatBox"
import MyPrivateAgentContentMobile from "@pages/ChatPage/Mobile/MyPrivateAgentContentMobile"
import Marketplace from "@pages/Marketplace"
import { Route, Routes } from "react-router-dom"

const AppRouter = () => {
  const { isMobile } = useWindowSize()

  return (
    <Routes>
      <Route
        path={PATH_NAMES.HOME}
        element={isMobile ? <MainLayout /> : <ChatPage />}
      >
        <Route path={PATH_NAMES.CHAT_DETAIL} element={<ChatBox />} />
        <Route
          path={`${PATH_NAMES.INVITE}/:inviteUserId`}
          element={isMobile ? <ChatDetailLoadingPage /> : <ChatBox />}
        />
        <Route
          path={`${PATH_NAMES.PRIVATE_AGENT}/:privateChatId`}
          element={<ChatPage />}
        />
        <Route
          path={PATH_NAMES.PRIVATE_AGENT}
          element={<MyPrivateAgentContentMobile />}
        />
        <Route path={PATH_NAMES.MARKETPLACE} element={<Marketplace />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
