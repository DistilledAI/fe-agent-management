import { SITE_LLM_SUPPORTED } from "@constants/index"
import { updateChatBox } from "@reducers/chatbot/ChatBoxSlice"
import { updateChatMsg } from "@reducers/chatbot/ChatMsgSlice"
import { getVisitorId } from "@utils/index"
import { postHistories } from "services/llmChatbot"
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppRedux"

const chatbotUrl = import.meta.env.VITE_APP_CHATBOT_URL

export enum ChatRoles {
  USER = "user",
  ASSISTANT = "assistant",
}

export type ChatItem = {
  role: ChatRoles
  content: string
  id: string
}

export interface ChatMsgData {
  chat_history: Array<ChatItem>
  message: string
  wallet_address: string
  interest_tokens: Array<any>
}

let controller: any

const useChatMsg = () => {
  const dispatch = useAppDispatch()
  let msgText = ""
  const chatMsg = useAppSelector((state) => state.chatMsg)
  const sessionId = useAppSelector((state) => state.chatBox.sid)

  const callPost = async (answerData?: any, chatMsgData?: any) => {
    const deviceId = await getVisitorId()

    try {
      const interestTokens = chatMsg?.interest_tokens || []
      const uniqInterestTokens = [...new Set(interestTokens)]
      const signedMessageData = {
        id: chatMsgData?.chat_history?.[chatMsgData?.chat_history?.length - 1]
          ?.id,
        userId: deviceId || "",
        sessionId: sessionId || "",
        // message: chatMsgData
        //   ? chatMsgData?.message
        //   : chatHistory?.[chatHistory.length - 2]?.content,
        message: chatMsgData?.message,
        answer: answerData,
        walletAddress: chatMsg?.wallet_address,
        interestTokens: uniqInterestTokens,
        site: SITE_LLM_SUPPORTED.ORAI,
        signedMessage: "oraiKey",
      }

      const res = await postHistories(signedMessageData)
      console.log("res:", res)
    } catch (error) {
      console.log({ error })
    }
  }

  const updateChatHistory = (newText: string, chatMsgCurrent: ChatMsgData) => {
    dispatch(
      updateChatMsg({
        ...chatMsgCurrent,
        chat_history: chatMsgCurrent.chat_history.map(
          (item: ChatItem, i: number) => {
            if (
              i === chatMsgCurrent.chat_history.length - 1 &&
              item.role === ChatRoles.ASSISTANT
            ) {
              msgText += ` ${newText}`
              return {
                ...item,
                content: msgText,
              }
            }
            return item
          },
        ),
      }),
    )
    const element = document.getElementById("conversation-wrapper")
    if (element) {
      element.scrollTop = element.scrollHeight
    }
  }

  const fetchChatMsg = async (chatMsgData: ChatMsgData) => {
    // Create a new AbortController instance
    controller = new AbortController()
    const signal = controller.signal

    dispatch(
      updateChatBox({
        isChatting: true,
      }),
    )
    updateChatHistory("Scanning...", chatMsgData)
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }

    try {
      const newChatMsgData: ChatMsgData =
        chatMsgData.chat_history.length > 2
          ? {
              ...chatMsgData,
              chat_history: chatMsgData.chat_history.slice(0, -2),
            }
          : {
              ...chatMsgData,
              message: chatMsgData.message,
              chat_history: [],
            }

      const analyzeRes = await fetch(`${chatbotUrl}/analyze_message`, {
        ...settings,
        body: JSON.stringify({
          message: chatMsgData.message,
        }),
      })

      if (!analyzeRes.ok || !analyzeRes.body) {
        throw analyzeRes.statusText
      }
      const analyzeData = await analyzeRes.json()

      const response = await fetch(`${chatbotUrl}/with_context`, {
        ...settings,
        body: JSON.stringify({
          ...newChatMsgData,
          ...analyzeData,
          wallet_address:
            analyzeData?.wallet_address || newChatMsgData.wallet_address,
          interest_tokens: newChatMsgData.interest_tokens.concat(
            analyzeData.interest_tokens,
          ),
        }),
      })

      if (!response.ok || !response.body) {
        throw response.statusText
      }

      // Read the response as a stream of data
      const reader = response.body.getReader()
      const decoder = new TextDecoder("utf-8")
      msgText = ""

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read()
        const decodedChunk = decoder.decode(value)
        if (done) {
          dispatch(
            updateChatBox({
              isChatting: false,
            }),
          )

          callPost(msgText, chatMsgData)
          break
        }

        updateChatHistory(decodedChunk.replace("<|im_end|>", ""), {
          ...chatMsgData,
          ...analyzeData,
          wallet_address:
            analyzeData?.wallet_address || newChatMsgData.wallet_address,
          interest_tokens: newChatMsgData.interest_tokens.concat(
            analyzeData.interest_tokens,
          ),
        })
      }
    } catch (error) {
      // Handle fetch request errors
      msgText = ""
      if (signal.aborted) {
        updateChatHistory("Request aborted.", chatMsgData)
      } else {
        console.error("Error:", error)
        updateChatHistory("Error occurred while scanning.", chatMsgData)
      }
    } finally {
      controller = null // Reset the AbortController instance
      dispatch(
        updateChatBox({
          isChatting: false,
        }),
      )
    }
  }

  return { fetchChatMsg }
}

export default useChatMsg
