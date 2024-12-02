import bitcoinMaxIntro from "@assets/video/bitcoin-max-intro-ai.mp4"
import stalorAudio from "@assets/audio/audio_stalor.mp3"
import VideoCustom from "@components/VideoCustom"
import { Button, Image, Skeleton, useDisclosure } from "@nextui-org/react"
import { UserGroup } from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import { useQueries, useQueryClient } from "@tanstack/react-query"
import React, { useEffect, useMemo, useState } from "react"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import AgentDescription from "./AgentDescription"
import TradeTokenButton from "./TradeTokenButton"
import SocialButton from "./SocialButton"
import { TwitterIcon } from "@components/Icons/Twitter"
import { ShareArrowIcon } from "@components/Icons/Share"
import { TelegramOutlineIcon } from "@components/Icons/SocialLinkIcon"
import ShareQRModal from "@components/ShareQRModal"
import { solanaCircleIcon } from "@assets/svg"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import { CopyIcon } from "@components/Icons/Copy"
import AudioClanCustom from "@components/AudioClanCustom"

export const AGENT_INFO_CLANS = [
  {
    username: "@maxisbuyin_",
    xLink: "https://x.com/maxisbuyin_",
    teleLink: "https://t.me/maxisbuyin",
    shareLink: "https://mesh.distilled.ai/clan/@maxisbuyin_",
    contract: "oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h",
  },
  {
    username: "@stalor",
    xLink: "",
    teleLink: "",
    shareLink: "https://mesh.distilled.ai/clan/@stalor",
    contract: "",
  },
]

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
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 200)
  }, [])

  const agentInfo = useMemo(
    () =>
      AGENT_INFO_CLANS.find(
        (agent) => agent.username === groupDetail?.group.label,
      ),
    [groupDetail?.group.label],
  )

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
        <div className="mt-3 hidden items-center justify-between gap-3 md:flex">
          <SocialButton
            icon={<TwitterIcon size={20} />}
            link={agentInfo?.xLink}
            isDisabled={!agentInfo?.xLink}
          />
          <SocialButton
            icon={<TelegramOutlineIcon size={20} />}
            link={agentInfo?.teleLink}
            isDisabled={!agentInfo?.teleLink}
          />
          <>
            <Button
              className="h-14 w-full rounded-full bg-mercury-70 text-white md:h-10"
              onClick={onOpen}
              isDisabled={!agentInfo?.shareLink}
            >
              <ShareArrowIcon />
            </Button>
            <ShareQRModal
              title={agentInfo?.username}
              isOpen={isOpen}
              shareUrl={agentInfo?.shareLink || ""}
              onClose={onClose}
            />
          </>
        </div>
        <div className="mt-3 hidden md:block">
          <TradeTokenButton isMaxi={isMaxi} />
        </div>
        {agentInfo?.contract ? (
          <div className="mt-3 hidden items-center justify-between gap-2 md:flex">
            <span className="text-16 font-bold text-mercury-950">Contract</span>
            <div className="flex items-center gap-2 rounded-[22px] bg-mercury-30 px-2 py-[2px] hover:bg-mercury-50">
              <img src={solanaCircleIcon} />
              {agentInfo?.contract ? (
                <div
                  className="flex cursor-pointer items-center gap-2"
                  onClick={(e) => copyClipboard(e, agentInfo?.contract ?? "")}
                >
                  <span className="text-16 text-mercury-900">
                    {centerTextEllipsis(agentInfo?.contract ?? "", 6)}
                  </span>
                  <CopyIcon />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
      <div className="mt-2 hidden md:block">
        <AgentDescription groupDetail={groupDetail} isMaxi={isMaxi} />
      </div>
    </div>
  )
}
export default LeftContent
