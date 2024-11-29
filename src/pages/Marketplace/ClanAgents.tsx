import AvatarCustom from "@components/AvatarCustom"
import { LiveIcon } from "@components/Icons"
import { MessageDots } from "@components/Icons/Message"
import { PATH_NAMES } from "@constants/index"
import { Button } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { getListGroupAgentPublic } from "services/group"
import { IGroupDetail } from "types/group"
import { QueryDataKeys } from "types/queryDataKeys"

const ClanAgents = () => {
  const navigate = useNavigate()

  const handleChatWithClan = async (clan: IGroupDetail) => {
    const inviteUrl = `${PATH_NAMES.CLAN}/${clan.label}`
    return navigate(inviteUrl)
  }

  const { data: clans = [], error } = useQuery({
    queryKey: [QueryDataKeys.PUBLIC_GROUP_AGENT],
    queryFn: getListGroupAgentPublic,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  if (error) {
    console.log({ error })
  }

  return clans.map((clan: IGroupDetail, index: number) => (
    <div
      className="flex h-fit cursor-pointer justify-between gap-2 rounded-[22px] border-b border-b-mercury-70 p-2 last:border-none hover:bg-mercury-200 md:border-b-[0px]"
      key={index}
      onClick={() => handleChatWithClan(clan)}
    >
      <div className="flex gap-4">
        <AvatarCustom
          badgeClassName="bg-lgd-code-hot-ramp"
          src={clan.image || undefined}
          publicAddress={clan.name}
          badgeIcon={<LiveIcon />}
          isLive
        />
        <div>
          <h4 className="text-base-b line-clamp-1 text-mercury-800">
            {clan.name}
          </h4>
          <p className="line-clamp-2 text-13 font-medium text-mercury-600">
            {clan.description}
          </p>
        </div>
      </div>
      <Button
        className="min-w-[52px] rounded-full border border-mercury-50 bg-mercury-100 px-4 py-2"
        onClick={() => handleChatWithClan(clan)}
      >
        <MessageDots />
      </Button>
    </div>
  ))
}

export default ClanAgents
