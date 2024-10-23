import MainLayout from "@components/Layout/MainLayout"
import MainLayoutDesktop from "@components/Layout/MainLayoutDesktop"
import { ChatDetailLoadingPage } from "@components/LoadingMobile"
import { PATH_NAMES } from "@constants/index"
import useWindowSize from "@hooks/useWindowSize"
import ChatPage from "@pages/ChatPage"
import ChatBox from "@pages/ChatPage/ChatBox"
import ChatPageMobile from "@pages/ChatPage/Mobile"
import MyPrivateAgentContentMobile from "@pages/ChatPage/Mobile/MyPrivateAgentContentMobile"
import Marketplace from "@pages/Marketplace"
import { Route, Routes } from "react-router-dom"

const AppRouter = () => {
  const { isMobile } = useWindowSize()

  return (
    <Routes>
      <Route
        path={PATH_NAMES.HOME}
        element={isMobile ? <MainLayout /> : <MainLayoutDesktop />}
      >
        <Route
          path={PATH_NAMES.HOME}
          element={isMobile ? <ChatPageMobile /> : <ChatBox />}
        />
        <Route
          path={PATH_NAMES.CHAT_DETAIL}
          element={isMobile ? <ChatPageMobile /> : <ChatBox />}
        />
        <Route
          path={`${PATH_NAMES.INVITE}/:inviteUserId`}
          element={isMobile ? <ChatDetailLoadingPage /> : <ChatBox />}
        />
        <Route
          path={`${PATH_NAMES.PRIVATE_AGENT}/:privateChatId`}
          element={isMobile ? <ChatPage /> : <ChatBox />}
        />
        <Route path={PATH_NAMES.MARKETPLACE} element={<Marketplace />} />

        {isMobile && (
          <>
            <Route
              path={PATH_NAMES.PRIVATE_AGENT}
              element={<MyPrivateAgentContentMobile />}
            />
          </>
        )}
      </Route>
    </Routes>
  )
}

export default AppRouter
