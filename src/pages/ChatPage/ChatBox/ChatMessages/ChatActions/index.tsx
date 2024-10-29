import DelegatePrivateAgent from "./DelegatePrivateAgent"
import ClearChat from "./ClearChat"

const ChatActions = () => {
  return (
    <div className="absolute bottom-[69px] left-1/2 z-10 mx-auto flex w-full max-w-[768px] -translate-x-1/2 items-center justify-between bg-mercury-30 px-3 py-2 md:bottom-[96px] md:bg-white">
      <ClearChat />
      <DelegatePrivateAgent />
    </div>
  )
}

export default ChatActions
