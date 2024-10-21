import { logout, updateUser } from "@reducers/userSlice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getUser } from "services/user"
import useAuthState from "./useAuthState"

const useFetchMe = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { isLogin, sessionAccessToken } = useAuthState()
  console.log("XXX", isLogin)

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await getUser()
      if (res.data) {
        dispatch(updateUser({ user: res.data }))
      } else {
        dispatch(logout())
      }
    } catch (error: any) {
      console.error(error)
      if (error.response.data.message === "Unauthorized") {
        dispatch(logout())
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
