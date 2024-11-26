import { PATH_NAMES } from "@constants/index"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { getAgentDetail } from "services/agent"
import { QueryDataKeys } from "types/queryDataKeys"

const useFetchDetail = () => {
  const { agentId } = useParams()
  const navigate = useNavigate()

  const fetchAgentDetail = async () => {
    try {
      const agentIdNumber = Number(agentId)
      const response = await getAgentDetail(agentIdNumber)
      if (response?.data) return response.data
      else navigate(PATH_NAMES.HOME)
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
      navigate(PATH_NAMES.HOME)
    }
  }

  const { data: agentData, refetch } = useQuery({
    queryKey: [QueryDataKeys.AGENT_DETAIL],
    queryFn: fetchAgentDetail,
    refetchOnWindowFocus: false,
  })

  return { agentData, refetch }
}

export default useFetchDetail
