import useAuthState from "@hooks/useAuthState"
import usePrivateAgent from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/usePrivateAgent"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { getMyBotData } from "services/user"
import { QueryDataKeys } from "types/queryDataKeys"
import { IBotData } from "types/user"

const useFetchMyData = () => {
  const { privateAgentData, callGetMyPrivateAgent } = usePrivateAgent()
  const { isLogin } = useAuthState()
  const botId = privateAgentData?.id

  const { data, isLoading, isFetched, refetch } = useQuery({
    queryKey: [`${QueryDataKeys.MY_BOT_DATA}-${botId}`, botId],
    queryFn: () => getMyBotData(botId),
    enabled: !!botId && isLogin,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  const list: IBotData[] = data?.data?.items || []

  useEffect(() => {
    callGetMyPrivateAgent()
  }, [])

  return { list, isLoading, isFetched, refetch }
}

export default useFetchMyData
