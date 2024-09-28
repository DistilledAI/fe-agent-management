import { RootState } from "@configs/store"
import { updateUser } from "@reducers/user/UserSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "services/user"

const useFetchMe = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const isLogin = useSelector((state: RootState) => state.user.isLogin)

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
