import React from "react"
import ChatInput from "../ChatInput"
import useSubmitChat from "@hooks/useSubmitChat"
import SpeechRecognition from "react-speech-recognition"
import { useQuery } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"
import useAuthState from "@hooks/useAuthState"
import { useParams } from "react-router-dom"

const SendMessage: React.FC<{
  groupId: string | undefined
}> = ({ groupId }) => {
  const { privateChatId, chatId } = useParams()
  const { isLogin } = useAuthState()
  const { mutation } = useSubmitChat({
    groupId,
    callbackDone: SpeechRecognition.stopListening,
  })

  const { data: isChatting } = useQuery<boolean>({
    initialData: false,
    queryKey: [QueryDataKeys.IS_CHATTING, groupId],
    enabled: !!groupId,
  })

  const isEnableTextInput = isLogin && (chatId || privateChatId)

  return (
    <ChatInput
      onSubmit={mutation.mutate}
      isPending={mutation.isPending}
      isDisabledInput={isChatting || !isEnableTextInput}
      wrapperClassName="left-1/2 -translate-x-1/2 w-[calc(100%-32px)]"
    />
  )
}

export default SendMessage
