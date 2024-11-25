import ClearContext from "./ClearContext"
import DelegatePrivateAgent from "./DelegatePrivateAgent"

interface ChatActionsProps {
  isShowDelegateButton?: boolean
}

const ChatActions = ({ isShowDelegateButton = true }: ChatActionsProps) => {
  return (
    <div className="absolute bottom-[69px] left-1/2 z-10 mx-auto flex w-full max-w-[768px] -translate-x-1/2 items-center justify-between bg-mercury-30 px-3 py-1 md:bottom-[96px] md:bg-white lg:px-0">
      <ClearContext />
      {isShowDelegateButton ? (
        <div className="ml-auto hidden md:block">
          <DelegatePrivateAgent />
        </div>
      ) : null}
    </div>
  )
}

export default ChatActions
