import { PATH_NAMES } from "@constants/index"
import ChatPage from "@pages/ChatPage"
import MyPrivateAgentContentMobile from "@pages/ChatPage/Mobile/MyPrivateAgentContentMobile"
import Marketplace from "@pages/Marketplace"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: PATH_NAMES.HOME,
    element: <ChatPage />,
  },
  {
    path: PATH_NAMES.CHAT_DETAIL,
    element: <ChatPage />,
  },
  {
    path: `${PATH_NAMES.INVITE}/:userId`,
    element: <ChatPage />,
  },
  {
    path: `${PATH_NAMES.PRIVATE_AGENT}/:privateChatId`,
    element: <ChatPage />,
  },
  {
    path: PATH_NAMES.PRIVATE_AGENT,
    element: <MyPrivateAgentContentMobile />,
  },
  {
    path: PATH_NAMES.MARKETPLACE,
    element: <Marketplace />,
  },
])

export default router
