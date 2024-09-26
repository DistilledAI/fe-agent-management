import { useAuth0 } from "@auth0/auth0-react"
import useLogin from "@hooks/useLogin"
import { Button } from "@nextui-org/react"
import TokenService from "services/token"

const LoginButton: React.FC<{}> = () => {
  const { isAuthenticated } = useAuth0()
  const uerInfo = TokenService.getUserLocal()
  const accessToken = uerInfo?.token?.accessToken
  const handleLogin = useLogin()

  if (!accessToken && !isAuthenticated) {
    return (
      <Button radius="full" className="btn-primary w-40" onClick={handleLogin}>
        Log in
      </Button>
    )
  }

  return null
}
export default LoginButton
