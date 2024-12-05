import bitcoinMaxIntro from "@assets/video/bitcoin-max-intro-ai.mp4"
import stalorAudio from "@assets/audio/audio_stalor.mp3"
import VideoCustom from "@components/VideoCustom"
import { Image, Skeleton, useDisclosure } from "@nextui-org/react"
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
import BetModal from "@components/BetModal"
import { bgBtcPrediction, bitmaxAva, btcIconRote } from "@assets/images"
import { useSearchParams } from "react-router-dom"

const LeftContent: React.FC<{
  groupDetail: UserGroup | null
  isFetched: boolean
}> = ({ groupDetail, isFetched }) => {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const prediction = searchParams.get("prediction")
  const [isLoaded, setIsLoaded] = useState(false)
  const { isOpen, onOpenChange, onOpen } = useDisclosure()
  const isMaxi =
    groupDetail?.group.label === "@maxisbuyin" ||
    groupDetail?.group.label === "@maxisbuyin_"

  useEffect(() => {
    if (!!prediction && isMaxi) onOpen()
  }, [prediction, isMaxi])

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
          <div className="relative">
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
            <div
              onClick={onOpen}
              className="absolute bottom-2 left-3 right-3 flex cursor-pointer items-center justify-between rounded-full bg-[rgba(52,54,54,0.7)] px-2 py-2 backdrop-blur-[10px]"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#A5DC004D]">
                  <div className="h-2 w-2 rounded-full bg-[#58DC00]"></div>
                </div>
                <p className="text-14 font-medium leading-4 text-white">
                  Play to <br /> Earn $MAX
                </p>
              </div>
              <div
                style={{
                  backgroundImage: `url(${bgBtcPrediction})`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
                className="flex h-[50px] items-center gap-2 rounded-full px-3"
              >
                <div className="relative">
                  <Image className="h-8 w-8 rounded-full" src={bitmaxAva} />
                  <Image
                    classNames={{
                      wrapper: "w-4 h-4 absolute bottom-[-2px] right-[-2px]",
                    }}
                    src={btcIconRote}
                  />
                </div>
                <p className="whitespace-nowrap font-extrabold italic text-white">
                  <span className="text-[#F7931A]">$BTC</span> Prediction
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              backgroundImage:
                'url("https://data.cupiee.com/images/companion-stalor-bg.png")',
            }}
            className="relative h-[400px] overflow-hidden rounded-[32px]"
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
      {isOpen && <BetModal onOpenChange={onOpenChange} isOpen={isOpen} />}
    </div>
  )
}
export default LeftContent
