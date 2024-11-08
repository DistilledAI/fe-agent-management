import useJoinGroupLive from "@hooks/useJoinGroupLive"
import useWindowSize from "@hooks/useWindowSize"
import ChatLiveHeader from "./ChatLiveHeader"
import LeftContent from "./LeftContent"
import RightContent from "./RightContent"

const ChatBoxLive = () => {
  useJoinGroupLive()
  const { isMobile } = useWindowSize()

  return (
    <div className="relative mx-auto h-dvh max-w-[1232px] bg-mercury-30 max-md:overflow-hidden max-md:pt-[60px] md:h-[calc(100dvh-68px)] md:bg-white md:px-6">
      {isMobile ? <ChatLiveHeader /> : <></>}

      <div className="flex h-full gap-2 pb-4 max-lg:flex-col md:gap-10">
        <LeftContent />
        <RightContent />
      </div>
    </div>
  )
}
export default ChatBoxLive
