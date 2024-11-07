import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getGroupDetailFromLabel } from "services/chat"

const useGetChatId = () => {
  const { chatId: chatIdParam } = useParams()

  const getChatId = async () => {
    try {
      if (chatIdParam?.includes("@")) {
        const res = await getGroupDetailFromLabel(chatIdParam)
        return res?.data?.id
      }

      return chatIdParam
    } catch (error) {
      console.log("error", error)
    }
  }

  const { data: chatId } = useQuery({
    queryKey: ["chat-detail-live", chatIdParam],
    queryFn: getChatId,
    staleTime: 60 * 60 * 1000,
    enabled: !!chatIdParam,
  })

  return { chatId, originalChatId: chatIdParam }
}

export default useGetChatId
