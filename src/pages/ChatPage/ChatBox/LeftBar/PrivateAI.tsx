import AvatarContainer from "@components/AvatarContainer"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { FilledUserIcon, FilledUsersPlusIcon } from "@components/Icons/UserIcon"
import useFetchGroup from "./useFetchGroup"
import { useNavigate, useParams } from "react-router-dom"

const PrivateAI: React.FC = () => {
  const { data } = useFetchGroup()
  const navigate = useNavigate()
  const { chatId } = useParams()

  return (
    <div>
      <div className="my-4 h-[1px] w-full bg-mercury-100" />
      <div className="flex-items-center mb-4 justify-between px-2">
        <span className="text-base-14">Messages</span>
        <div className="flex-items-center gap-4">
          <FilledUsersPlusIcon />
          <FilledSearchIcon />
        </div>
      </div>

      {data.map((chat) => (
        <div
          key={chat.id}
          aria-checked={Number(chatId) === chat.groupId}
          onClick={() => navigate(`/chat/${chat.groupId}`)}
          className="hover-light-effect relative mb-1 gap-2 rounded-full px-2 py-2 aria-checked:bg-mercury-100"
        >
          <AvatarContainer
            badgeIcon={<FilledUserIcon size={14} />}
            userName={`Agent #${chat.groupId}`}
            avatarUrl={chat.group.image}
            badgeClassName="bg-[#0FE9A4]"
          />
          {Number(chatId) === chat.groupId && (
            <div className="absolute -left-4 top-1/2 h-[40px] w-[5px] -translate-y-1/2 rounded-br-full rounded-tr-full bg-[#DC6D1E]" />
          )}
        </div>
      ))}
    </div>
  )
}
export default PrivateAI
