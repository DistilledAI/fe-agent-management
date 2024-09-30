import { updateUser } from "@reducers/user/UserSlice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getUser } from "services/user"
import useAuthState from "./useAuthState"

const useFetchMe = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { isLogin } = useAuthState()

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await getUser()
      if (res.data) {
        dispatch(updateUser({ user: res.data }))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLogin) fetchData()
  }, [isLogin])

  return { loading }
}

export default useFetchMe
