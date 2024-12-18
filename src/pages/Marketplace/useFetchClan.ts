import { useEffect, useState } from "react"
import { getListGroupAgentPublic } from "services/group"
import { IGroupDetail } from "types/group"

const useFetchClan = (isFetchNow = true, userId?: number) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IGroupDetail[]>([])

  const getList = async (hasLoading = true) => {
    try {
      if (hasLoading) setLoading(true)
      const filter = userId
        ? JSON.stringify({ userId: userId.toString() })
        : undefined
      const res = await getListGroupAgentPublic(filter)
      if (res.data.items) setData(res.data.items)
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isFetchNow) getList()
  }, [userId, isFetchNow])

  return { data, loading, getList }
}

export default useFetchClan
