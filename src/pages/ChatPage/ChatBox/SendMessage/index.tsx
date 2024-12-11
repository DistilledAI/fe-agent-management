import useAuthState from "@hooks/useAuthState"
import useSubmitChat from "@hooks/useSubmitChat"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { useParams } from "react-router-dom"
import SpeechRecognition from "react-speech-recognition"
import { QueryDataKeys } from "types/queryDataKeys"
import ChatInput from "../ChatInput"

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
      onSubmit={(messageValue) => mutation.mutate({ message: messageValue })}
      isPending={mutation.isPending}
      isDisabledInput={isChatting || !isEnableTextInput}
      wrapperClassName="left-1/2 -translate-x-1/2 w-[calc(100%-32px)]"
    />
  )
}

export default SendMessage
