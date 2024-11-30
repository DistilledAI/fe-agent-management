import { bgClanDefault } from "@assets/images"
import bitcoinMaxIntro from "@assets/video/bitcoin-max-intro-ai.mp4"
import AvatarCustom from "@components/AvatarCustom"
import VideoCustom from "@components/VideoCustom"
import { Image, Skeleton } from "@nextui-org/react"
import { UserGroup } from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import { useQueries, useQueryClient } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import AgentDescription from "./AgentDescription"
import TradeTokenButton from "./TradeTokenButton"
// import TotalMemberBadge from "@components/TotalMemberBadge"

const LeftContent: React.FC<{
  groupDetail: UserGroup | null
  isFetched: boolean
}> = ({ groupDetail, isFetched }) => {
  const queryClient = useQueryClient()
  const [isLoaded, setIsLoaded] = useState(false)
  const isMaxi =
    groupDetail?.group.label === "@maxisbuyin" ||
    groupDetail?.group.label === "@maxisbuyin_"

  const [agentLiveVolume, closeLiveChat, expandLiveChat] = useQueries({
    queries: [
      {
        initialData: true,
        queryKey: [QueryDataKeys.AGENT_LIVE_VOLUME],
        staleTime: Infinity,
      },
      {
        queryKey: [QueryDataKeys.CLOSE_LIVE_CHAT],
      },
      {
        queryKey: [QueryDataKeys.EXPAND_LIVE_CHAT],
      },
    ],
  })
  const isMuted = !!agentLiveVolume.data
  const isCloseChatLive = !!closeLiveChat.data
  const isExpandLiveChat = !!expandLiveChat.data

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 200)
  }, [])

  return (
    <div
      className={twMerge(
        "flex w-full max-w-full flex-col transition-all duration-300 ease-linear max-md:px-4 lg:max-w-[320px]",
        isExpandLiveChat && "hidden",
        isCloseChatLive && "h-[calc(100%-113px)]",
      )}
    >
      <div className="flex h-full flex-col md:h-fit">
        {!isLoaded || !isFetched ? (
          <Skeleton className="h-[427px] rounded-[32px]"></Skeleton>
        ) : isMaxi ? (
          <VideoCustom
            videoSrc={bitcoinMaxIntro}
            classNames={{
              video: twMerge(
                "h-full min-h-[350px] w-full rounded-[32px] object-cover max-md:max-h-[350px] md:h-auto md:min-h-[426px]",
                isCloseChatLive && "max-md:max-h-full",
              ),
            }}
            isVolumeIcon
            onMuteToggle={(muted) =>
              queryClient.setQueryData<boolean>(
                [QueryDataKeys.AGENT_LIVE_VOLUME],
                () => muted,
              )
            }
            muted={isMuted}
          />
        ) : (
          <div className="relative max-h-[427px] overflow-hidden rounded-[32px]">
            <Image
              classNames={{ wrapper: "w-full h-full !max-w-full" }}
              className="h-full w-full object-cover"
              src={bgClanDefault}
              alt="clan"
              disableAnimation
            />
            <div className="absolute left-1/2 top-1/2 z-[11] h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 rounded-full">
              <AvatarCustom
                className="h-full w-full object-cover"
                src={groupDetail?.group.image}
                publicAddress={groupDetail?.group?.name}
              />
            </div>
            {/* <div className="absolute right-4 top-4 z-[11]">
              <TotalMemberBadge
                groupId={groupDetail?.groupId?.toString() ?? ""}
              />
            </div> */}
          </div>
        )}

        <div className="mt-6 hidden items-center justify-between gap-2 md:flex">
          {/* <TwitterButton /> */}
          <TradeTokenButton />
        </div>
      </div>
      <div className="mt-6 hidden md:block">
        <AgentDescription groupDetail={groupDetail} isMaxi={isMaxi} />
      </div>
    </div>
  )
}
export default LeftContent
