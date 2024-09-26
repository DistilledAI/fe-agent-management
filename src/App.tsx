import mixpanel from "mixpanel-browser"
import { Suspense, useEffect } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import RoutesConfig from "./routes"

const mixpanelToken = import.meta.env.VITE_APP_MIXPANEL_TOKEN
const envMode = import.meta.env.VITE_APP_ENV_MODE

function App() {
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

  return (
    <Router>
      <Suspense>
        <RoutesConfig isAuthenticated={true} />
      </Suspense>
    </Router>
  )
}

export default App
