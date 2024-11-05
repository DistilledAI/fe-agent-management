import AvatarCustom from "@components/AvatarCustom"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { getBadgeColor } from "./helpers"
import { PATH_NAMES, RoleUser } from "@constants/index"
// import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { Button, useDisclosure } from "@nextui-org/react"
import { ShareWithQrIcon } from "@components/Icons/Share"
import { ThreeDotsCircleIcon } from "@components/Icons/SocialLinkIcon"
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import ShareModal from "../UserAuth/AccountSetting/Agent/ShareAgent/ShareModal"

const AgentInfoCard = () => {
  const { chatId } = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data }: any = useQuery({
    queryKey: ["chat-detail", chatId],
    enabled: !!chatId,
    staleTime: 60 * 60 * 1000,
    refetchOnMount: false,
  })
  const agentInfo = data && data?.data ? data?.data : {}

  return (
    <>
      <div className="mx-auto max-w-[768px] border border-mercury-100 bg-mercury-50 p-3 md:rounded-[14px] md:p-4">
        <div className="flex gap-x-3 md:gap-x-4">
          <AvatarCustom
            src={agentInfo?.group?.userB?.avatar}
            badgeClassName={getBadgeColor(RoleUser.BOT)}
            badgeIcon={<FilledBrainAIIcon />}
          />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between gap-x-2 md:gap-x-4">
              <div>
                <h4 className="text-16 font-bold text-mercury-950">
                  {agentInfo?.group?.userB?.username}
                </h4>
                <div className="flex items-center gap-x-1 max-[320px]:flex-wrap md:gap-x-2">
                  <span className="text-14 font-medium text-mercury-600 md:text-16">
                    Create by
                  </span>
                  <div className="flex cursor-pointer items-center gap-x-1">
                    <AvatarCustom
                      src={agentInfo?.group?.userB?.avatar}
                      className="h-[18px] w-[18px]"
                    />
                    <Link
                      to={`${PATH_NAMES.AUTHOR_PROFILE}/${agentInfo?.group?.userB?.id}`}
                    >
                      <span className="line-clamp-1 text-16 font-bold text-brown-10 hover:text-brown-10/70">
                        {agentInfo?.group?.userB?.username}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex gap-x-1 md:gap-x-2">
                <Button
                  isIconOnly
                  onClick={onOpen}
                  className="rounded-full border border-mercury-50 bg-mercury-100 md:h-9 md:min-w-[52px]"
                >
                  <ShareWithQrIcon />
                </Button>
                <Button
                  isDisabled
                  isIconOnly
                  className="rounded-full border border-mercury-50 bg-mercury-100 md:h-9 md:min-w-[52px]"
                >
                  <ThreeDotsCircleIcon />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-x-2 md:gap-x-4">
              <p className="line-clamp-2 max-w-[510px] text-14 font-medium text-mercury-600">
                {agentInfo?.group?.userB?.description || "Distilled AI Agent"}
              </p>
              {/* <div className="flex items-center gap-x-1">
                <span className="text-13 font-medium text-mercury-900">
                  Read more
                </span>
                <ChevronDownIcon />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <ShareModal
        isOpen={isOpen}
        onClose={onClose}
        agentData={agentInfo?.group?.userB}
      />
    </>
  )
}

export default AgentInfoCard
