import { UserGroup } from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getGroupChatDetail } from "services/chat"

const useFetchDetail = () => {
  const { chatId } = useParams()

  const { data } = useQuery({
    queryKey: ["chat-detail", chatId],
    queryFn: () => getGroupChatDetail(Number(chatId)),
    staleTime: 60 * 60 * 1000,
    enabled: !!chatId,
  })
  const result: UserGroup | null = data?.data || null

  return { groupDetail: result, chatId }
}

export default useFetchDetail
