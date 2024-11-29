import useJoinGroupLive from "@hooks/useJoinGroupLive"
import useWindowSize from "@hooks/useWindowSize"
import ChatLiveHeader from "./ChatLiveHeader"
import LeftContent from "./LeftContent"
import RightContent from "./RightContent"
import { twMerge } from "tailwind-merge"
import useFetchDetail from "@pages/ChatPage/Mobile/ChatDetail/useFetch"

const ChatBoxLive = () => {
  const { isInvited } = useJoinGroupLive()
  const { isMobile } = useWindowSize()
  const { groupDetail, isFetched } = useFetchDetail(isInvited)

  return (
    <div
      className={twMerge(
        "relative mx-auto h-dvh max-w-[1232px] bg-mercury-30 max-md:overflow-hidden max-md:pt-[60px] md:h-[calc(100dvh-68px)] md:bg-white md:px-6",
      )}
    >
      {isMobile ? <ChatLiveHeader groupDetail={groupDetail} /> : <></>}

      <div className="flex h-full gap-2 pb-4 max-lg:flex-col md:gap-5">
        <LeftContent groupDetail={groupDetail} isFetched={isFetched} />
        <RightContent isClan />
      </div>
    </div>
  )
}
export default ChatBoxLive
