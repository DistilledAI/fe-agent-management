import bitcoinMaxIntro from "@assets/video/bitcoin-max-intro-ai.mp4"
import { VolumeIcon, VolumeOffIcon } from "@components/Icons/Voice"
import { useQueries, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import TradeTokenButton from "./TradeTokenButton"
import AgentDescription from "./AgentDescription"
import TwitterButton from "./TwitterButton"

const LeftContent = () => {
  const videoRef = useRef<any>(null)
  const queryClient = useQueryClient()
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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      queryClient.setQueryData(
        [QueryDataKeys.AGENT_LIVE_VOLUME],
        () => videoRef.current.muted,
      )
    }
  }

  return (
    <div
      className={twMerge(
        "flex w-full max-w-full flex-col transition-all duration-300 ease-linear max-md:px-4 lg:max-w-[320px]",
        isExpandLiveChat && "hidden",
        isCloseChatLive && "h-[calc(100%-113px)]",
      )}
    >
      <div className="flex h-full flex-col md:h-fit">
        <div className="relative h-full">
          <video
            ref={videoRef}
            muted={isMuted}
            autoPlay
            playsInline
            loop
            className={twMerge(
              "h-full w-full rounded-[32px] object-cover max-md:max-h-[350px] md:h-auto",
              isCloseChatLive && "max-md:max-h-full",
            )}
          >
            <source src={bitcoinMaxIntro} type="video/mp4" />
            <track kind="captions"></track>
          </video>
          <button
            type="button"
            onClick={toggleMute}
            className="absolute left-5 top-5 z-10 p-[1px]"
          >
            {isMuted ? (
              <VolumeOffIcon color="white" />
            ) : (
              <VolumeIcon color="white" />
            )}
          </button>
        </div>

        <div className="mt-6 hidden items-center justify-between gap-2 md:flex">
          <TwitterButton />
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
