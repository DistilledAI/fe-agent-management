import bitcoinMaxIntro from "@assets/video/bitcoin-max-intro-ai.mp4"
import { Skeleton } from "@nextui-org/react"
import { useQueries, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import AgentDescription from "./AgentDescription"
import TradeTokenButton from "./TradeTokenButton"
import VideoCustom from "@components/VideoCustom"

const LeftContent = () => {
  const queryClient = useQueryClient()
  const [isLoaded, setIsLoaded] = useState(false)

  const queries = useQueries({
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
  const isMuted = !!queries[0].data
  const isCloseChatLive = !!queries[1].data
  const isExpandLiveChat = !!queries[2].data

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
        <Skeleton isLoaded={isLoaded} className="rounded-[32px]">
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
        </Skeleton>

        <div className="mt-6 hidden items-center justify-between gap-2 md:flex">
          {/* <TwitterButton /> */}
          <TradeTokenButton />
        </div>
      </div>
      <div className="mt-6 hidden md:block">
        <AgentDescription />
      </div>
    </div>
  )
}
export default LeftContent
