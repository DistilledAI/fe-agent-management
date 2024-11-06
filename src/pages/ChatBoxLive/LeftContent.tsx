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
        queryKey: [QueryDataKeys.AGENT_LIVE_VOLUME],
        staleTime: Infinity,
      },
      {
        queryKey: [QueryDataKeys.EXPAND_LIVE_CHAT],
      },
    ],
  })
  const isMuted = !!queries[0].data
  const isExpandLiveChat = !!queries[1].data

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      queryClient.setQueryData(
        ["agent-live-volume"],
        () => videoRef.current.muted,
      )
    }
  }

  return (
    <div
      className={twMerge(
        "flex w-full max-w-full flex-1 flex-col transition-all duration-300 ease-linear max-md:px-4 lg:max-w-[320px]",
        isExpandLiveChat && "hidden",
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
            className="h-full w-full rounded-[32px] object-cover md:h-auto"
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
