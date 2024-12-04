import bitcoinMaxIntro from "@assets/video/bitcoin-max-intro-ai.mp4"
import stalorAudio from "@assets/audio/audio_stalor.mp3"
import VideoCustom from "@components/VideoCustom"
import { Image, Skeleton } from "@nextui-org/react"
import { UserGroup } from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import { useQueries, useQueryClient } from "@tanstack/react-query"
import React, { useEffect, useMemo, useState } from "react"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import AgentDescription from "./AgentDescription"
import TradeTokenButton from "./TradeTokenButton"
import { solanaCircleIcon } from "@assets/svg"
import ContractDisplay from "./ContractDisplay"
import { AGENT_INFO_CLANS } from "@constants/index"
import AudioClanCustom from "@components/AudioClanCustom"
import SkeletonInfo, { SkeletonDesc } from "./SkeletonInfo"
import AgentSocials from "./AgentSocials"

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

  const agentInfo = useMemo(
    () =>
      AGENT_INFO_CLANS.find(
        (agent) => agent.username === groupDetail?.group.label,
      ),
    [groupDetail?.group?.label],
  )

  return (
    <div
      className={twMerge(
        "flex w-full max-w-full flex-col transition-all duration-300 ease-linear max-md:px-4 lg:max-w-[320px]",
        isExpandLiveChat && "hidden",
        isCloseChatLive && "h-[calc(100%-230px)]",
      )}
    >
      <div className="flex h-full flex-col md:h-fit">
        {!isLoaded || !isFetched || groupDetail === null ? (
          <Skeleton className="h-[350px] rounded-[32px] md:h-[400px]"></Skeleton>
        ) : isMaxi ? (
          <VideoCustom
            videoSrc={bitcoinMaxIntro}
            classNames={{
              video: twMerge(
                "h-full min-h-[350px] w-full rounded-[32px] object-cover max-h-[350px] md:max-h-[400px] md:h-auto",
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
          <div
            style={{
              backgroundImage:
                'url("https://data.cupiee.com/images/companion-stalor-bg.png")',
            }}
            className="relative h-[350px] overflow-hidden rounded-[32px] md:h-[400px]"
          >
            <Image
              classNames={{ wrapper: "w-full h-full !max-w-full" }}
              className="h-full w-full object-contain"
              src="https://data.cupiee.com/images/companion-stalor-sad.png"
              alt="clan"
              disableAnimation
            />
            <AudioClanCustom audioSrc={stalorAudio} />
          </div>
        )}
        {isFetched && groupDetail !== null ? (
          <>
            <AgentSocials
              agentInfo={agentInfo}
              classNames={{
                wrapper: "mt-3 hidden md:flex",
              }}
            />
            <div className="mt-3 hidden md:block">
              <TradeTokenButton isMaxi={isMaxi} />
            </div>
            <ContractDisplay
              classNames={{
                wrapper: "mt-3 hidden md:flex",
              }}
              icon={agentInfo?.contract ? solanaCircleIcon : ""}
              value={agentInfo?.contract}
            />
          </>
        ) : (
          <SkeletonInfo />
        )}
      </div>
      <div className="mt-2 hidden md:block">
        {isFetched && groupDetail !== null ? (
          <AgentDescription groupDetail={groupDetail} isMaxi={isMaxi} />
        ) : (
          <SkeletonDesc />
        )}
      </div>
    </div>
  )
}
export default LeftContent
