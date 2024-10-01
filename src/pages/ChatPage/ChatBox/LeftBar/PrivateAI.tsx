import AvatarContainer from "@components/AvatarContainer"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { FilledUserIcon, FilledUsersPlusIcon } from "@components/Icons/UserIcon"
import useFetchGroup from "./useFetchGroup"
import { useNavigate } from "react-router-dom"

const PrivateAI: React.FC = () => {
  const { data } = useFetchGroup()
  const navigate = useNavigate()

  return (
    <div>
      <div className="my-4 h-[1px] w-full bg-mercury-100" />
      <div className="flex-items-center mb-4 justify-between px-2">
        <span className="text-base-14">Private AI Agents</span>
        <div className="flex-items-center gap-4">
          <FilledUsersPlusIcon />
          <FilledSearchIcon />
        </div>
      </div>

      {data.map((chat) => (
        <div
          key={chat.id}
          onClick={() => navigate(`/chat/${chat.groupId}`)}
          className="hover-light-effect mb-1 gap-2 rounded-full px-2 py-2"
        >
          <AvatarContainer
            badgeIcon={<FilledUserIcon size={14} />}
            avatarUrl="/src/assets/images/thuongdo.png"
            userName={`Agent #${chat.groupId}`}
            badgeClassName="bg-[#0FE9A4]"
          />
        </div>
      ))}
    </div>
  )
}
export default PrivateAI
