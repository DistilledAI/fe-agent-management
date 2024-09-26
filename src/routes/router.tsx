import { PATHS_NAME } from "@constants/index"
import ChatPage from "@pages/ChatPage"
import { createBrowserRouter } from "react-router-dom"


const router = createBrowserRouter([
  {
    path: PATHS_NAME.HOME,
    element: <ChatPage />,
  },
])

export default router
