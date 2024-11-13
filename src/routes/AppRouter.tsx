import MainLayout from "@components/Layout/MainLayout"
import MainLayoutDesktop from "@components/Layout/MainLayoutDesktop"
import ProtectedByAuth from "@components/Layout/ProtectedByAuth"
import { ChatDetailLoadingPage } from "@components/LoadingMobile"
import { PATH_NAMES } from "@constants/index"
import useWindowSize from "@hooks/useWindowSize"
import Account from "@pages/Account"
import AddMyData from "@pages/AddMyData"
import AuthorProfile from "@pages/AuthorProfile"
import ChatBoxLive from "@pages/ChatBoxLive"
import ChatMyAgent from "@pages/ChatMyAgent"
import AgentDetail from "@pages/ChatPage/AgentDetail"
import ChatBox from "@pages/ChatPage/ChatBox"
import ChatPageMobile from "@pages/ChatPage/Mobile"
import MyPrivateAgentContentMobile from "@pages/ChatPage/Mobile/MyPrivateAgentContentMobile"
import Marketplace from "@pages/Marketplace"
import MyData from "@pages/MyData"
import PageNotFound from "@pages/NotFound"
import { Route, Routes } from "react-router-dom"

const AppRouter = () => {
  const { isMobile } = useWindowSize()

  return (
    <Routes>
      <Route
        path={PATH_NAMES.HOME}
        element={isMobile ? <MainLayout /> : <MainLayoutDesktop />}
      >
        {/* Route Regular */}
        <Route
          path={PATH_NAMES.HOME}
          element={isMobile ? <ChatPageMobile /> : <ChatBox />}
        />
        <Route
          path={PATH_NAMES.CHAT_DETAIL}
          element={isMobile ? <ChatPageMobile /> : <ChatBox />}
        />
        <Route path={`${PATH_NAMES.LIVE}/:chatId`} element={<ChatBoxLive />} />
        <Route
          path={`${PATH_NAMES.INVITE}/:inviteAgentId`}
          element={isMobile ? <ChatDetailLoadingPage /> : <ChatBox />}
        />
        <Route
          path={`${PATH_NAMES.PRIVATE_AGENT}/:privateChatId`}
          element={isMobile ? <ChatPageMobile /> : <ChatMyAgent />}
        />
        <Route path={PATH_NAMES.MARKETPLACE} element={<Marketplace />} />
        <Route
          path={`${PATH_NAMES.ADD_MY_DATA}/:botId`}
          element={<AddMyData />}
        />
        <Route path={PATH_NAMES.ADD_MY_DATA} element={<AddMyData />} />
        <Route
          path={`${PATH_NAMES.AUTHOR_PROFILE}/:authorId`}
          element={<AuthorProfile />}
        />
        {isMobile && (
          <>
            <Route
              path={PATH_NAMES.PRIVATE_AGENT}
              element={<MyPrivateAgentContentMobile />}
            />
          </>
        )}

        {/* Route Protected By Auth */}
        <Route path={PATH_NAMES.HOME} element={<ProtectedByAuth />}>
          <Route path={PATH_NAMES.MY_DATA} element={<MyData />} />
          <Route path={PATH_NAMES.ACCOUNT} element={<Account />} />
          <Route
            path={`${PATH_NAMES.AGENT_DETAIL}/:agentId`}
            element={<AgentDetail />}
          />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRouter
