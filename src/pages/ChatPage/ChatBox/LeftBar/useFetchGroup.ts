import useAuthState from "@hooks/useAuthState"
import { useEffect, useState } from "react"
import { getGroupList } from "services/chat"

export interface IGroup {
  id: number
  name: string
  image?: string
  userAId: number
  userBId: number
  createBy: number
  status: number
  createdAt: string
}

interface UserGroup {
  id: number
  userId: number
  groupId: number
  joinedAt: string
  createdAt: string
  group: IGroup
}

const useFetchGroup = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<UserGroup[]>([])
  const { isLogin } = useAuthState()

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await getGroupList()
      if (res.data.items) setData(res.data.items)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLogin) fetchData()
  }, [isLogin])

  return { loading, data, fetchData }
}

export default useFetchGroup
