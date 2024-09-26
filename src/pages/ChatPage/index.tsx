import ChatBox from "./ChatBox"
import ChatHeader from "./ChatHeader"

const ChatPage = () => {
  return (
    <div className="bg-white font-barlow">
      <ChatHeader />
      <div className="h-[calc(100dvh-54px)] w-full">
        <ChatBox />
      </div>
    </div>
  )
}

export default ChatPage
