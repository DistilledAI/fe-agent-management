import useAuthState from "@hooks/useAuthState"
import { UserGroup } from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import { useQuery } from "@tanstack/react-query"
import { getGroupChatDetail } from "services/chat"
import useGetChatId from "./useGetChatId"
import { QueryDataKeys } from "types/queryDataKeys"

const useFetchDetail = (isInvited = false) => {
  const { isLogin } = useAuthState()
  const { chatId } = useGetChatId()

  const params =
    chatId && chatId?.toString().includes("@")
      ? { filter: `{"label":"${chatId}"}` }
      : { filter: `{"groupId":${chatId}}` }

  const { data, isLoading, isFetched } = useQuery({
    queryKey: [QueryDataKeys.GROUP_DETAIL, chatId?.toString(), `${isInvited}`],
    queryFn: () => getGroupChatDetail(params),
    staleTime: 60 * 60 * 1000,
    enabled: !!chatId && !!isLogin,
  })
  const result: UserGroup | null = data?.data || null

  return { groupDetail: result, chatId, isLoading, isFetched }
}

export default useFetchDetail
