// import ComingSoon from "@components/ComingSoon"
import { MessagePlusIcon } from "@components/Icons/Message"
import { Button } from "@nextui-org/react"
import { useQueryClient } from "@tanstack/react-query"
import { ICachedMessageData, chatMessagesKey } from "../useFetchMessages"
import { useParams } from "react-router-dom"

const ClearChat = () => {
  const queryClient = useQueryClient()
  const { chatId, privateChatId } = useParams()
  const groupId = privateChatId || chatId

  const handleClearChat = () => {
    const cachedData = queryClient.getQueryData<ICachedMessageData>(
      chatMessagesKey(groupId),
    ) || {
      pageParams: [],
      pages: [
        {
          messages: [],
          nextOffset: 0,
        },
      ],
    }
    const lastMessages = cachedData.pages[cachedData.pages.length - 1].messages

    if (lastMessages.length) {
      const isChatCleared = lastMessages[lastMessages.length - 1].isChatCleared
      if (isChatCleared) return
    }

    const newMessage = {
      isChatCleared: true,
      createdAt: new Date().toISOString(),
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
  }

  return (
    <Button
      className="btn-primary max-md:!border-mercury-100"
      onClick={handleClearChat}
    >
      <div>
        <MessagePlusIcon />
      </div>
      Clear chat
    </Button>
  )
}

export default ClearChat
