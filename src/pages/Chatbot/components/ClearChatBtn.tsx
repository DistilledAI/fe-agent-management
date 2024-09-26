import { useAppDispatch, useAppSelector } from "@hooks/useAppRedux"
import { Button } from "@nextui-org/react"
import { updateChatBox } from "@reducers/chatbot/ChatBoxSlice"
import {
  defaultChatMesgData,
  updateChatMsg,
} from "@reducers/chatbot/ChatMsgSlice"

const ClearChatBtn = () => {
  const dispatch = useAppDispatch()
  const { isChatBox, isChatting } = useAppSelector((state) => state.chatBox)

  const handleClearChatData = () => {
    dispatch(updateChatMsg(defaultChatMesgData))
    dispatch(
      updateChatBox({
        isChatBox: false,
        isChatting: false,
        sid: "",
      }),
    )
  }

  return isChatBox ? (
    <Button
      type="button"
      radius="full"
      className="btn-primary !h-14 !bg-gray-light-blue dark:!bg-neutral-title !px-6 !text-gray-70 dark:!text-neutral-suface xl:h-[70px]"
      onClick={handleClearChatData}
      isDisabled={isChatting}
    >
      Clear chat
    </Button>
  ) : null
}

export default ClearChatBtn
