import { STATUS_AGENT } from "@constants/index"
import { useQuery } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"

const useCheckBotActive = () => {
  const { data: dtAgent }: { data: any } = useQuery({
    queryKey: [QueryDataKeys.MY_BOT_LIST],
    refetchOnWindowFocus: false,
  })
  const isBotActive = dtAgent?.data?.items?.[0]?.status === STATUS_AGENT.ACTIVE

  return { isBotActive }
}

export default useCheckBotActive
