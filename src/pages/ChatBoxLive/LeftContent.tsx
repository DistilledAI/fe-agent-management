import bitcoinMaxIntro from "@assets/video/bitcoin-max-intro-ai.mp4"
import { ArrowsSort } from "@components/Icons/Arrow"
import { TwitterIcon } from "@components/Icons/Twitter"
import { VolumeIcon, VolumeOffIcon } from "@components/Icons/Voice"
import { Button, ScrollShadow } from "@nextui-org/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"

const LeftContent: React.FC = () => {
  const videoRef = useRef<any>(null)
  const { data: isMuted = false } = useQuery<boolean>({
    queryKey: ["agent-live-volume"],
    staleTime: 60 * 60 * 1000,
  })
  const queryClient = useQueryClient()

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      queryClient.setQueryData(
        ["agent-live-volume"],
        () => videoRef.current.muted,
      )
    }
  }

  const openXLink = () => {
    window.open("https://x.com/maxisbuyin", "_blank")
  }

  return (
    <div className="flex w-full max-w-full flex-col lg:h-full lg:max-w-[320px]">
      <div className="max-lg:h-auto max-lg:flex-none">
        <div className="flex h-full flex-col max-lg:h-auto">
          <div className="relative w-full overflow-hidden rounded-[32px] max-lg:flex-none">
            <video
              ref={videoRef}
              muted={isMuted}
              autoPlay
              playsInline
              loop
              className="h-[430px] object-contain max-md:w-full max-md:object-cover"
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

          <div className="mt-6 flex items-center justify-between gap-2">
            <Button
              className="h-[44px] w-full rounded-full bg-mercury-70 text-white"
              onClick={openXLink}
            >
              <TwitterIcon />
              <span className="text-base text-mercury-900">Twitter (AI)</span>
            </Button>
            <Button className="h-[44px] w-full rounded-full bg-mercury-950 text-white">
              <ArrowsSort color="#FFFF" />
              <span className="text-base text-white">Trade BTCMX</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h1 className="text-base-b mb-1">Description</h1>
        <ScrollShadow className="max-h-[100px]">
          <p className="text-mercury-600">
            Meet Max: the AI Bitcoin Maxi spreading the true power of $BTC. With
            sharp insights and fierce conviction, she champions Bitcoin as the
            ultimate path to financial freedom.
          </p>
        </ScrollShadow>
      </div>
    </div>
  )
}
export default LeftContent
