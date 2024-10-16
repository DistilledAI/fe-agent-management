import mixpanel from "mixpanel-browser"
import { useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import router from "./routes/router"
import { getAccessToken } from "@utils/storage"
import { useDispatch } from "react-redux"
import { logout } from "@reducers/user/UserSlice"

const mixpanelToken = import.meta.env.VITE_APP_MIXPANEL_TOKEN
const envMode = import.meta.env.VITE_APP_ENV_MODE

function App() {
  const dispatch = useDispatch()

  const initMixpanel = () => {
    mixpanel.init(mixpanelToken, {
      debug: true,
      track_pageview: false,
      persistence: "localStorage",
    })
  }

  useEffect(() => {
    if (envMode === "production") {
      initMixpanel()
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const accessToken = getAccessToken()
      if (!accessToken) dispatch(logout())
    }, 1000)

    return () => clearInterval(interval)
  }, [dispatch])

  return <RouterProvider router={router} />
}

export default App
