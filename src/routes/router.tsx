import { PATH_NAMES } from "@constants/index"
import ChatPage from "@pages/ChatPage"
import Test from "@pages/Test"
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
    path: "test",
    element: <Test />,
  },
])

export default router
