import ChatInput from "./ChatInput"
import ChatMessages from "./ChatMessages"
import LeftBar from "./LeftBar"
import UserAuth from "./UserAuth"

const ChatBox = () => {
  return (
    <div className="flex h-full items-center justify-center pb-10 pt-[18px]">
      <div className="flex h-full w-full max-w-[1100px] flex-col gap-y-6 rounded-[32px] border border-mercury-100 bg-mercury-70 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-black-999 m-0 p-0 text-24 font-semibold">
            Inbox
          </h3>
          <UserAuth />
        </div>
        <div className="grid h-full w-full grid-cols-3 gap-4">
          <div className="col-span-1 h-full w-full">
            <LeftBar />
          </div>
          <div className="col-span-2 h-full w-full">
            <ChatMessages />
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
