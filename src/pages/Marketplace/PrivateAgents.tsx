import AvatarCustom from "@components/AvatarCustom"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { MessageDots } from "@components/Icons/Message"
import { envConfig } from "@configs/env"
import { PATH_NAMES, RoleUser, STATUS_AGENT } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import { IUser } from "@reducers/userSlice"
import { useQuery } from "@tanstack/react-query"
import { ConfigBotType } from "@types"
import { useNavigate } from "react-router-dom"
import { inviteUserJoinGroup, searchUsers } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"

const PrivateAgents = () => {
  const navigate = useNavigate()
  const { user } = useAuthState()

  const handleChatWithAgent = async (agent: IUser) => {
    // invite user to group live
    const isBotLive = agent?.configBot === ConfigBotType.LIVE
    if (isBotLive) {
      const groupId = envConfig.groupIdMax
      const inviteUserId = user?.id
      const payload = {
        groupId,
        member: [inviteUserId],
      }
      const res = await inviteUserJoinGroup(payload)
      if (res) navigate(`${PATH_NAMES.CHAT_LIVE_DETAIL}/${groupId}`)
      return
    }

    if (user && user.id === agent.owner) {
      navigate(`${PATH_NAMES.PRIVATE_AGENT}/${agent.id}`)
    } else {
      const inviteUrl = `${PATH_NAMES.INVITE}/${agent?.id}`
      navigate(inviteUrl)
    }
  }

  const fetchPrivateAgents = async () => {
    const payloadData = {
      username: "",
      status: STATUS_AGENT.ACTIVE,
      role: RoleUser.BOT,
    }
    const res = await searchUsers(JSON.stringify(payloadData))
    return res?.data?.items as IUser[]
  }

  const { data: agents = [], error } = useQuery({
    queryKey: [QueryDataKeys.PRIVATE_AGENTS_MKL],
    queryFn: fetchPrivateAgents,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  if (error) {
    console.log({ error })
  }

  return agents.map((agent, index) => (
    <div
      className="flex h-fit cursor-pointer justify-between rounded-[22px] border-b border-b-mercury-70 p-2 last:border-none hover:bg-mercury-200 md:border-b-[0px]"
      key={index}
      onClick={() => handleChatWithAgent(agent)}
    >
      <div className="flex gap-4">
        <AvatarCustom
          badgeClassName="bg-yellow-10"
          src={agent.avatar}
          publicAddress={agent.publicAddress}
          badgeIcon={<FilledBrainAIIcon size={14} />}
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base-b line-clamp-1 text-mercury-800">
              {agent.username}
            </span>
          </div>
          <p className="max-w-[187px] text-13 font-medium text-mercury-600">
            {agent.description || "Distilled AI Agent"}
          </p>
        </div>
      </div>
      <Button className="min-w-[52px] rounded-full border border-mercury-50 bg-mercury-100 px-4 py-2">
        <MessageDots />
      </Button>
    </div>
  ))
}

export default PrivateAgents
