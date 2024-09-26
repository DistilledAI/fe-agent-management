import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import TokenService from "services/token"

const useLogin = () => {
  const { loginWithRedirect } = useAuth0()
  const [searchParams] = useSearchParams()
  const referralInfo = TokenService.getReferralInfoLocal()

  const referredByCode =
    searchParams.get("referredByCode") || referralInfo?.referredByCode

  useEffect(() => {
    TokenService.setReferralInfoLocal(referredByCode)
  }, [referralInfo?.referredByCode, searchParams])

  const handleLogin = () => {
    return loginWithRedirect(
      referredByCode
        ? {
            appState: {
              referredByCode,
            },
          }
        : {},
    )
  }

  return handleLogin
}

export default useLogin
