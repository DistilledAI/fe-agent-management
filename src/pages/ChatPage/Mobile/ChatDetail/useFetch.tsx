import useAuthState from "@hooks/useAuthState"
import { UserGroup } from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import { useQuery } from "@tanstack/react-query"
import { getGroupChatDetail } from "services/chat"
import useGetChatId from "./useGetChatId"

const useFetchDetail = () => {
  const { isLogin } = useAuthState()
  const { chatId } = useGetChatId()

  const params =
    chatId && chatId?.toString().includes("@")
      ? { filter: `{"label":"${chatId}"}` }
      : { filter: `{"groupId":${chatId}}` }

  const { data } = useQuery({
    queryKey: ["chat-detail", chatId],
    queryFn: () => getGroupChatDetail(params),
    staleTime: 60 * 60 * 1000,
    enabled: !!chatId && !!isLogin,
  })
  const result: UserGroup | null = data?.data || null

  return { groupDetail: result, chatId }
}

export default useFetchDetail
