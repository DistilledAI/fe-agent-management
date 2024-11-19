import DelegatePrivateAgent from "./DelegatePrivateAgent"

const ChatActions = () => {
  return (
    <div className="absolute bottom-[69px] left-1/2 z-10 mx-auto hidden w-full max-w-[768px] -translate-x-1/2 items-center justify-between bg-mercury-30 px-3 py-1 md:bottom-[96px] md:flex md:bg-white lg:px-0">
      {/* <ClearChat /> */}
      <div className="ml-auto hidden md:block">
        <DelegatePrivateAgent />
      </div>
    </div>
  )
}

export default ChatActions
