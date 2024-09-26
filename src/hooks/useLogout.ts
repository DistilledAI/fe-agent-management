import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import TokenService from "services/token"

const useLogout = () => {
  const { logout } = useAuth0()

  const handleLogout = () => {
    TokenService.removeUserLocal()
    logout()
  }

  useEffect(() => {
    window.addEventListener("storage", function (e) {
      if (e.key === "logout") {
        handleLogout()
      }
    })
  }, [])

  return handleLogout
}

export default useLogout
