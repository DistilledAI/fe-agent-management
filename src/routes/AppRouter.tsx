import MainLayout from "@components/Layout/MainLayout"
import { ChatDetailLoadingPage } from "@components/LoadingMobile"
import { PATH_NAMES } from "@constants/index"
import useWindowSize from "@hooks/useWindowSize"
import ChatPage from "@pages/ChatPage"
import MyPrivateAgentContentMobile from "@pages/ChatPage/Mobile/MyPrivateAgentContentMobile"
import Marketplace from "@pages/Marketplace"
import { Route, Routes } from "react-router-dom"

const AppRouter = () => {
  const { isMobile } = useWindowSize()

  return (
    <Routes>
      <Route path={PATH_NAMES.HOME} element={<MainLayout />}>
        <Route path={PATH_NAMES.HOME} element={<ChatPage />} />
        <Route path={PATH_NAMES.CHAT_DETAIL} element={<ChatPage />} />
        <Route
          path={`${PATH_NAMES.INVITE}/:userId`}
          element={isMobile ? <ChatDetailLoadingPage /> : <ChatPage />}
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
