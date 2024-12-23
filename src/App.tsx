import useAuthAction from "@hooks/useAuthAction"
import { getAccessToken } from "@utils/storage"
import { useEffect } from "react"
import AppRouter from "./routes/AppRouter"

function App() {
  const { logout } = useAuthAction()

  useEffect(() => {
    const interval = setInterval(() => {
      const accessToken = getAccessToken()
      if (!accessToken) logout()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <AppRouter />
}

export default App
