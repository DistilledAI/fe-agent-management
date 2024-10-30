import { updateUser } from "@reducers/userSlice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getUser } from "services/user"
import useAuthState from "./useAuthState"
import useAuthAction from "./useAuthAction"

const useFetchMe = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { logout } = useAuthAction()
  const { isLogin, sessionAccessToken } = useAuthState()

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await getUser()
      if (res.data) {
        dispatch(updateUser({ user: res.data }))
      } else {
        logout()
      }
    } catch (error: any) {
      console.error(error)
      if (error.response.data.message === "Unauthorized") {
        logout()
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLogin) fetchData()
  }, [isLogin, sessionAccessToken])

  return { loading, fetchData }
}

export default useFetchMe
