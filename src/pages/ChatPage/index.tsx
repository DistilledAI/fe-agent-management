import useWindowSize from "@hooks/useWindowSize"
import ChatBox from "./ChatBox"
import ChatHeader from "./ChatHeader"
import OnlySupportDesktop from "./OnlySupportDesktop"

const ChatPage = () => {
  const { isDesktop } = useWindowSize()

  return (
    <div className="bg-white font-barlow">
      <ChatHeader />
      {isDesktop ? (
        <div className="h-[calc(100dvh-54px)] w-full">
          <ChatBox />
        </div>
      ) : (
        <OnlySupportDesktop />
      )}
    </div>
  )
}

export default ChatPage
