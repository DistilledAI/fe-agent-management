import { RoleUser } from "@constants/index"
import { RoleChat } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import {
  chatMessagesKey,
  ICachedMessageData,
} from "@pages/ChatPage/ChatBox/ChatMessages/useFetchMessages"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { makeId } from "@utils/index"
import { postChatToGroup } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"

const useSubmitChat = (
  groupId: string | undefined,
  callbackDone?: () => void,
) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: [QueryDataKeys.SEND_MESSAGE],
    mutationFn: (message: string) =>
      postChatToGroup({
        groupId: Number(groupId),
        messages: message,
      }),
    onMutate: (variables) => {
      const newMessage = {
        content: variables,
        role: RoleChat.OWNER,
        id: makeId(),
        roleOwner: RoleUser.USER,
        createdAt: new Date().toISOString(),
        isChatCleared: false,
      }

      queryClient.setQueryData(
        chatMessagesKey(groupId),
        (cachedData: ICachedMessageData) => {
          if (!cachedData)
            return {
              pageParams: [],
              pages: [
                {
                  messages: [newMessage],
                  nextOffset: 0,
                },
              ],
            }

          const lastPage = cachedData.pages[cachedData.pages.length - 1]

          return {
            ...cachedData,
            pages: [
              ...cachedData.pages.slice(0, -1),
              {
                ...lastPage,
                messages: [...lastPage.messages, newMessage],
              },
            ],
          }
        },
      )

      return { newMessage }
    },
    onSuccess: () => {
      if (callbackDone) callbackDone()
    },
    onError: (error) => {
      console.error("Failed to send message", error)
    },
  })

  return { mutation }
}

export default useSubmitChat
