import { sendOutlineIcon } from "@assets/svg"
import { useAppSelector } from "@hooks/useAppRedux"
import { Button } from "@nextui-org/react"
import { updateChatBox } from "@reducers/chatbot/ChatBoxSlice"
import { updateChatMsg } from "@reducers/chatbot/ChatMsgSlice"
import { createChatMsg } from "@utils/chatMsg"
import useChatMsg from "pages/Chatbot/hooks/useChatMsg"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { v4 as uuidv4 } from "uuid"

const ChatSuggestion = () => {
  const [suggestionList] = useState<any[]>([])
  const dispatch = useDispatch()
  const chatMsg = useAppSelector((state) => state.chatMsg)
  const { fetchChatMsg } = useChatMsg()
  const sessionId = useAppSelector((state) => state.chatBox.sid)
  const conversationElement = document.getElementById("conversation-wrapper")

  useEffect(() => {
    if (conversationElement) {
      conversationElement.scrollTop = conversationElement.scrollHeight
    }
  }, [suggestionList.length])

  // const callGetSuggestionList = async () => {
  //   try {
  //     const suggestionListResponse = await getSuggestionList()
  //     if (suggestionListResponse?.suggestions) {
  //       setSuggestionList(suggestionListResponse.suggestions)
  //     }
  //   } catch (error) {
  //     console.log(error, "errorr")
  //   }
  // }

  const onChatMsgSubmit = async (message: string) => {
    if (!message) return

    const payload = sessionId
      ? {
          isChatBox: true,
        }
      : {
          isChatBox: true,
          sid: uuidv4(),
        }

    dispatch(updateChatBox(payload))

    const newChatMsg = createChatMsg(message)
    const currentChatMsg = {
      ...chatMsg,
      chat_history: chatMsg.chat_history.concat(newChatMsg.chat_history),
      message,
      id: uuidv4(),
    }

    dispatch(updateChatMsg(currentChatMsg))

    await fetchChatMsg(currentChatMsg)
  }

  return (
    <div className="my-2 ml-auto flex w-fit flex-col gap-2 max-xl:px-2">
      {suggestionList.map((suggest: string, index: number) => (
        <section
          className="group flex flex-1 cursor-pointer items-center justify-between rounded-[20px] border-[2px] border-[#9FE870] bg-gray-light-blue p-1 transition-all duration-300 ease-linear hover:bg-gray-pale-blue dark:bg-black-bg_card xl:px-2 xl:py-1"
          key={index}
          onClick={() => {
            onChatMsgSubmit(suggest)
          }}
        >
          <p className="text-gray-9 text-14 italic dark:text-neutral-suface">
            {suggest}
          </p>
          <Button
            radius="full"
            className="btn-primary ml-1 flex !h-8 min-w-unit-8"
            onClick={() => {
              onChatMsgSubmit(suggest)
            }}
          >
            <img src={sendOutlineIcon} alt="" className="h-4 w-4" />
          </Button>
        </section>
      ))}
    </div>
  )
}

export default ChatSuggestion
