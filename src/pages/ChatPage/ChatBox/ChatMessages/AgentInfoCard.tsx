import AvatarCustom from "@components/AvatarCustom"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { PATH_NAMES, RoleUser } from "@constants/index"
import { getBadgeColor, IMessageBox } from "./helpers"
import { ShareWithQrIcon } from "@components/Icons/Share"
// import { ThreeDotsCircleIcon } from "@components/Icons/SocialLinkIcon"
import { Button, useDisclosure } from "@nextui-org/react"
import useGetChatId from "@pages/ChatPage/Mobile/ChatDetail/useGetChatId"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import ShareModal from "../UserAuth/AccountSetting/Agent/ShareAgent/ShareModal"
import { getUserPublicDetail } from "services/user"
import { QueryDataKeys } from "types/queryDataKeys"

const AgentInfoCard = ({ messages }: { messages: IMessageBox[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { chatId } = useGetChatId()

  const { data: chatDetailResult } = useQuery<any>({
    queryKey: ["chat-detail", chatId],
    enabled: !!chatId,
    staleTime: 60 * 60 * 1000,
    refetchOnMount: false,
  })

  const userBId = chatDetailResult?.data?.group?.userBId

  const { data } = useQuery({
    queryKey: [QueryDataKeys.USER_PUBLIC_DETAIL, userBId],
    queryFn: async () => {
      const agentIdOfUserB = messages.find(
        (message) => message.ownerId === userBId,
      )?.agentId
      return agentIdOfUserB ? await getUserPublicDetail(agentIdOfUserB) : null
    },
    enabled: !!userBId && messages.length > 0,
    staleTime: 60 * 60 * 1000,
  })

  const agentOwner = chatDetailResult?.data?.group?.userB
  const agentInfo = data?.data

  if (!agentInfo) {
    return <></>
  }

  return (
    <>
      <div className="mx-auto min-h-[111px] max-w-[768px] border border-mercury-100 bg-mercury-50 p-3 max-md:border-x-0 md:rounded-[14px] md:p-4">
        <div className="flex gap-x-3 md:gap-x-4">
          <AvatarCustom
            publicAddress={agentInfo?.publicAddress}
            src={agentInfo?.avatar}
            badgeClassName={getBadgeColor(RoleUser.BOT)}
            badgeIcon={<FilledBrainAIIcon />}
          />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between gap-x-2 md:gap-x-4">
              <div>
                <h4 className="text-16 font-bold text-mercury-950">
                  {agentInfo?.username || "-"}
                </h4>
                <div className="flex items-center gap-x-1 max-[320px]:flex-wrap md:gap-x-2">
                  <span className="text-14 font-medium text-mercury-600 md:text-16">
                    Create by
                  </span>
                  <div className="flex items-center gap-x-1">
                    <AvatarCustom
                      publicAddress={agentInfo?.publicAddress}
                      src={agentOwner?.avatar}
                      className="h-[18px] w-[18px]"
                    />
                    <Link to={`${PATH_NAMES.AUTHOR_PROFILE}/${agentOwner?.id}`}>
                      <span className="line-clamp-1 text-16 font-bold text-brown-10 hover:text-brown-10/70">
                        {agentOwner?.username}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex gap-x-1 md:gap-x-2">
                <Button
                  isIconOnly
                  isDisabled={!agentInfo}
                  onClick={onOpen}
                  className="rounded-full border border-mercury-50 bg-mercury-100 md:h-9 md:min-w-[52px]"
                >
                  <ShareWithQrIcon />
                </Button>
                {/* <Button
                  isDisabled
                  isIconOnly
                  className="rounded-full border border-mercury-50 bg-mercury-100 md:h-9 md:min-w-[52px]"
                >
                  <ThreeDotsCircleIcon />
                </Button> */}
              </div>
            </div>

            <div className="flex items-center justify-between gap-x-2 md:gap-x-4">
              <p className="line-clamp-2 max-w-[510px] text-14 font-medium text-mercury-600">
                {agentOwner?.description || "Distilled AI Agent"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ShareModal isOpen={isOpen} onClose={onClose} agentData={agentInfo} />
    </>
  )
}

export default AgentInfoCard
