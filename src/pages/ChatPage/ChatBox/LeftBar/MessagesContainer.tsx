import AvatarContainer from "@components/AvatarContainer"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { FilledUserIcon, FilledUsersPlusIcon } from "@components/Icons/UserIcon"
import useAuthState from "@hooks/useAuthState"
import { useNavigate, useParams } from "react-router-dom"
import { ContentDisplayMode, DISPLAY_MODES } from "./PrivateAI"
import useFetchGroup from "./useFetchGroup"
import { twMerge } from "tailwind-merge"

const MessagesContainer: React.FC<ContentDisplayMode> = ({
  onChangeDisplayMode,
}) => {
  const { data } = useFetchGroup()
  const { isLogin } = useAuthState()
  const navigate = useNavigate()
  const { chatId } = useParams()

  return (
    <>
      <div className="flex-items-center mb-4 justify-between px-2">
        <span className="text-base-14">Messages</span>
        <div className="flex-items-center gap-4">
          <FilledUsersPlusIcon />
          <div
            onClick={() => onChangeDisplayMode(DISPLAY_MODES.SEARCH)}
            className="cursor-pointer"
          >
            <FilledSearchIcon />
          </div>
        </div>
      </div>

      {isLogin && (
        <div className="-mx-4 max-h-[calc(100%-143px)] space-y-2 overflow-y-auto px-4">
          {data.map((chat) => {
            const isActive = Number(chatId) === chat.groupId
            return (
              <div
                key={chat.id}
                aria-selected={isActive}
                onClick={() => navigate(`/chat/${chat.groupId}`)}
                className={twMerge(
                  "hover-light-effect group/item relative gap-2 rounded-full px-2 py-2",
                  isActive && "bg-mercury-100",
                )}
              >
                <AvatarContainer
                  badgeIcon={<FilledUserIcon size={14} />}
                  avatarUrl={chat.group.image}
                  userName={`Agent #${chat.groupId}`}
                  badgeClassName="bg-[#0FE9A4]"
                />
                <div
                  className={twMerge(
                    "absolute -left-4 top-1/2 w-[5px] -translate-y-1/2 bg-lgd-code-agent-1 opacity-0 transition-all duration-300 ease-linear",
                    !isActive &&
                      "h-3 rounded-br-lg rounded-tr-lg group-hover/item:opacity-100",
                    isActive &&
                      "block h-10 rounded-br-full rounded-tr-full opacity-100",
                  )}
                />
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
export default MessagesContainer
