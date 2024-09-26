import { sendOutlineIcon } from "@assets/svg"
import Avatar from "@components/Avatar"
import { useAppSelector } from "@hooks/useAppRedux"
import React, { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { twMerge } from "tailwind-merge"

interface Props {
  inputWrapClassName?: string
  inputClassName?: string
  sendBtnClassName?: string
}

const ChatInput: React.FC<Props> = ({
  inputWrapClassName,
  inputClassName,
  sendBtnClassName,
  ...props
}) => {
  const { register, setFocus } = useFormContext()
  const chatBox = useAppSelector((state) => state.chatBox)
  const { isChatBox, isChatting } = chatBox

  useEffect(() => {
    setFocus("message")
  }, [setFocus, isChatBox])

  return (
    <div className={twMerge("relative flex items-center justify-between px-3 py-4 mt-1", inputWrapClassName)}>
      <div className="flex items-center gap-2">
        <Avatar />
        <input
          id="input-msg"
          type="text"
          className={twMerge(
            "focus-within:none w-[260px] appearance-none bg-transparent text-14 shadow-1 placeholder:text-[14px] placeholder:text-gray-60 focus-visible:outline-none dark:bg-[#242429] dark:text-neutral-suface",
            inputClassName,
          )}
          placeholder="Write your message..."
          autoComplete="off"
          {...register("message")}
          {...props}
        />
      </div>

      <button
        type="submit"
        disabled={isChatting}
        aria-disabled={isChatting}
        className={twMerge("bg-[#6A43B8] aria-disabled:bg-[#6A43B8]/50 !w-[54px] h-8 flex items-center justify-center rounded-full", sendBtnClassName)}
      >
        <img src={sendOutlineIcon} className="h-5 w-5"/>
      </button>
    </div>
  )
}

export default ChatInput
