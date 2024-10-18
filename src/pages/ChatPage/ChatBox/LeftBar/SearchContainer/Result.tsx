import AvatarContainer from "@components/AvatarContainer"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import { RoleUser } from "@constants/index"
import React from "react"
import { useNavigate } from "react-router-dom"
import { checkGroupDirect, createGroupChat } from "services/chat"

const SearchResult: React.FC<{
  data: any[]
  selectedCallback?: () => void
}> = ({ data, selectedCallback }) => {
  const navigate = useNavigate()

  const handleSelectPerson = async (chat: any) => {
    try {
      const receiverId = chat?.id
      const checkGroupDirectResponse = await checkGroupDirect({
        members: [receiverId],
      })
      const groupId = checkGroupDirectResponse?.data?.group?.id
      if (!groupId) {
        const createGroupResponse = await createGroupChat({
          members: [receiverId],
        })
        const newGroupId = createGroupResponse?.data?.id
        if (newGroupId) {
          navigate(`/chat/${newGroupId}`)
          if (selectedCallback) selectedCallback()
        }
        return
      }

      navigate(`/chat/${groupId}`)
      if (selectedCallback) selectedCallback()
    } catch (error) {
      console.log("error", error)
    }
  }

  const getBadgeIcon = (role: RoleUser) =>
    role === RoleUser.BOT ? (
      <FilledBrainAIIcon size={14} />
    ) : (
      <FilledUserIcon size={14} />
    )

  return data.map((chat) => {
    return (
      <div
        key={chat.id}
        onClick={() => handleSelectPerson(chat)}
        className="hover-light-effect relative mb-1 gap-2 rounded-full px-2 py-2"
      >
        <AvatarContainer
          badgeIcon={getBadgeIcon(chat?.role)}
          avatarUrl={chat?.avatar}
          userName={chat?.username}
          badgeClassName={
            chat?.role === RoleUser.USER ? "bg-[#0FE9A4]" : "bg-yellow-10"
          }
        />
      </div>
    )
  })
}

export default SearchResult
