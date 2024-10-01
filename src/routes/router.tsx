import { PATHS_NAME } from "@constants/index"
import ChatPage from "@pages/ChatPage"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: PATHS_NAME.HOME,
    element: <ChatPage />,
  },
  {
    path: PATHS_NAME.CHAT_DETAIL,
    element: <ChatPage />,
  },
])

export default router
