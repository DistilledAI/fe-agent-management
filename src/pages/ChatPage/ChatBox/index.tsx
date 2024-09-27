import ChatInput from "./ChatInput"
import LeftBar from "./LeftBar"
import MyEchoContent from "./RightContent/MyEchoContent"

const ChatBox = () => {
  return (
    <div className="flex h-full items-center justify-center pb-10 pt-[18px]">
      <div className="flex h-full w-full max-w-[1100px] flex-col gap-y-6 rounded-[32px] border border-mercury-100 bg-mercury-70 p-6">
        <div className="grid h-full w-full grid-cols-3 gap-4">
          <div className="col-span-1 h-full w-full">
            <LeftBar />
          </div>
          <div className="col-span-2 h-full w-full">
            {/* <ChatMessages /> */}
            <MyEchoContent />
          </div>
        </div>
        <div className="space-y-4">
          <ChatInput />
        </div>
      </div>
    </div>
  )
}

export default ChatBox
