import { useEffect, useState } from "react"
import { getListGroupAgentPublic } from "services/group"
import { IGroupDetail } from "types/group"

const useFetchClan = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IGroupDetail[]>([])

  const getList = async () => {
    try {
      const res = await getListGroupAgentPublic()
      if (res.data.items) setData(res.data.items)
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  return { data, loading }
}

export default useFetchClan
