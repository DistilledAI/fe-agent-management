import mixpanel from "mixpanel-browser"
import { useEffect } from "react"
import { getAccessToken } from "@utils/storage"
import AppRouter from "./routes/AppRouter"
import useAuthAction from "@hooks/useAuthAction"
import EarnedPointToast from "@components/EearnedPointToast"
import MediaPreview from "@components/MediaPreview"
import useFetchMyAgent from "@hooks/useFetchMyAgent"

const mixpanelToken = import.meta.env.VITE_APP_MIXPANEL_TOKEN
const envMode = import.meta.env.VITE_APP_ENV_MODE

function App() {
  const { logout } = useAuthAction()
  useFetchMyAgent()

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
      if (!accessToken) logout()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <AppRouter />
      <EarnedPointToast />
      <MediaPreview />
    </>
  )
}

export default App
