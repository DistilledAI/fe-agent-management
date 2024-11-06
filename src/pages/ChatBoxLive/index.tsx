import useJoinGroupLive from "@hooks/useJoinGroupLive"
import ChatLiveHeader from "./HeaderMobile"
import LeftContent from "./LeftContent"
import RightContent from "./RightContent"

const ChatBoxLive = () => {
  useJoinGroupLive()

  return (
    <div className="relative mx-auto h-dvh max-w-[1232px] overflow-hidden max-md:pt-[60px] md:h-[calc(100dvh-68px)] md:px-6">
      <div className="md:hidden">
        <ChatLiveHeader />
      </div>
      <div className="flex h-full max-h-dvh gap-2 pb-4 max-lg:flex-col md:gap-10">
        <LeftContent />
        <RightContent />
      </div>
    </div>
  )
}
export default ChatBoxLive
