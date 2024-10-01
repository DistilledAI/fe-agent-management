import AvatarContainer from "@components/AvatarContainer"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { FilledUserIcon, FilledUsersPlusIcon } from "@components/Icons/UserIcon"
import { useNavigate, useParams } from "react-router-dom"
import { ContentDisplayMode, DISPLAY_MODES } from "./PrivateAI"
import useFetchGroup from "./useFetchGroup"

const MessagesContainer: React.FC<ContentDisplayMode> = ({
  onChangeDisplayMode,
}) => {
  const { data } = useFetchGroup()
  const navigate = useNavigate()
  const { chatId } = useParams()

  return (
    <>
      <div className="flex-items-center mb-4 justify-between px-2">
        <span className="text-base-14">Messages</span>
        <div className="flex-items-center gap-4">
          <FilledUsersPlusIcon />
          <div onClick={() => onChangeDisplayMode(DISPLAY_MODES.SEARCH)}>
            <FilledSearchIcon />
          </div>
        </div>
      </div>

      {data.map((chat) => (
        <div
          key={chat.id}
          onClick={() => navigate(`/chat/${chat.groupId}`)}
          className="hover-light-effect relative mb-1 gap-2 rounded-full px-2 py-2"
        >
          <AvatarContainer
            badgeIcon={<FilledUserIcon size={14} />}
            avatarUrl="/src/assets/images/thuongdo.png"
            userName={`Agent #${chat.groupId}`}
            badgeClassName="bg-[#0FE9A4]"
          />
          {Number(chatId) === chat.groupId && (
            <div className="absolute -left-4 top-1/2 h-[40px] w-[5px] -translate-y-1/2 rounded-br-full rounded-tr-full bg-[#DC6D1E]" />
          )}
        </div>
      ))}
    </>
  )
}
export default MessagesContainer
