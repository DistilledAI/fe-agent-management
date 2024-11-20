import { STATUS_AGENT } from "@constants/index"
import { useQueries } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getMyBotData } from "services/user"
import { QueryDataKeys } from "types/queryDataKeys"

interface IAgentData {
  id: number
  name: string
  status: number
}

interface UseActiveAgentReturn {
  isAgentActive: boolean
  currentAgent: IAgentData | null
  agentDataList: IAgentData[]
  agentList: IAgentData[]
  isAgentDataFetched: boolean
}

const useActiveAgent = (): UseActiveAgentReturn => {
  const { botId } = useParams<{ botId: string }>()

  const [agentDataQuery, agentListQuery] = useQueries<
    [
      { data: { data: { items: IAgentData[] } } },
      { data: { data: { items: IAgentData[] } } },
    ]
  >({
    queries: [
      {
        queryKey: [`${QueryDataKeys.MY_BOT_DATA}-${botId}`],
        queryFn: () => getMyBotData(Number(botId), { limit: 1, offset: 0 }),
        enabled: !!botId,
      },
      {
        queryKey: [QueryDataKeys.MY_BOT_LIST],
      },
    ],
  })

  const { data: agentData, isFetched: isAgentDataFetched } = agentDataQuery

  const agentDataList = agentData?.data?.items || []
  const agentList = agentListQuery?.data?.data?.items || []

  const currentAgent =
    agentList.find((agent: IAgentData) => agent?.id?.toString() === botId) ||
    agentList[0] ||
    null
  const isAgentActive = currentAgent?.status === STATUS_AGENT.ACTIVE

  return {
    isAgentActive,
    currentAgent,
    agentDataList,
    agentList,
    isAgentDataFetched,
  }
}

export default useActiveAgent
