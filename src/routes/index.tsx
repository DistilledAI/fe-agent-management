import { PATHS_NAME } from "@constants/index"
import { lazy } from "react"
import { RouteObject, useRoutes } from "react-router-dom"
import { RequireAuth } from "./RequireAuth"

const Chatbot = lazy(() => import("pages/Chatbot"))

const RoutesConfig = (props: any) => {
  const routers: RouteObject[] = [
    // { path: "/", element: <Home /> },
    {
      path: PATHS_NAME.LLM,
      element: (
        <RequireAuth isAuthenticated={props.isAuthenticated}>
          <Chatbot />
        </RequireAuth>
      ),
    },
  ]

  const elements = useRoutes(routers)
  return elements
}

export default RoutesConfig
