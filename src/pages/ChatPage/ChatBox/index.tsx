import Agents from "./Agents"
import ChatInput from "./ChatInput"
import ChatMessages from "./ChatMessages"
import ExploreProtocols from "./ExploreProtocols"
import ModelsAI from "./ModelsAI"
import Settings from "./Settings"

const ChatBox = () => {
  return (
    <div className="flex h-full items-center justify-center pb-10 pt-[18px]">
      <div className="flex h-full w-full max-w-[1000px] flex-col gap-y-6 rounded-[32px] border border-mercury-100 bg-mercury-70 p-6">
        <div className="flex items-center justify-between">
          <Agents />
          <Settings />
        </div>
        <ChatMessages />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <ModelsAI />
            <ExploreProtocols />
          </div>
          <ChatInput />
        </div>
      </div>
    </div>
  )
}

export default ChatBox
