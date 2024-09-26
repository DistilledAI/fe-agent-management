import { PATHS_NAME } from "@constants/index"
import { lazy } from "react"
import { RouteObject, useRoutes } from "react-router-dom"
import { RequireAuth } from "./RequireAuth"

const ChatPage = lazy(() => import("pages/ChatPage"))

const RoutesConfig = (props: any) => {
  const routers: RouteObject[] = [
    {
      path: PATHS_NAME.HOME,
      element: (
        <RequireAuth isAuthenticated={props.isAuthenticated}>
          <ChatPage />
        </RequireAuth>
      ),
    },
  ]

  const elements = useRoutes(routers)
  return elements
}

export default RoutesConfig
