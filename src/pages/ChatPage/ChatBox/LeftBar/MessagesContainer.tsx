import AvatarContainer from "@components/AvatarContainer"
import DotLoading from "@components/DotLoading"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { FilledUserIcon, FilledUsersPlusIcon } from "@components/Icons/UserIcon"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Virtuoso } from "react-virtuoso"
import { twMerge } from "tailwind-merge"
import { getAvatarGroupChat } from "./helpers"
import MoreChatAction from "./MoreChatAction"
import { ContentDisplayMode, DISPLAY_MODES } from "./PrivateAI"
import useFetchGroups from "./useFetchGroups"

const LIMIT = 10

const MessagesContainer: React.FC<ContentDisplayMode> = ({
  onChangeDisplayMode,
}) => {
  const { fetchGroups, groups, isLoading } = useFetchGroups()
  const navigate = useNavigate()
  const { chatId } = useParams()
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(10)

  const handleLoadMore = async () => {
    if (hasMore) {
      const newGroups = await fetchGroups({
        offset,
        isLoadMore: true,
      })
      if (!newGroups.length) return setHasMore(false)
      setOffset((prev) => prev + LIMIT)
    }
  }

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

      <div className="-mx-4 h-full max-h-[calc(100%-143px)]">
        <Virtuoso
          style={{ height: "100%" }}
          data={groups}
          components={{
            Footer: () =>
              isLoading ? (
                <div className="flex items-center justify-center">
                  <DotLoading />
                </div>
              ) : (
                <></>
              ),
          }}
          increaseViewportBy={500}
          endReached={(index) => {
            console.log("INDEX", index)
            if (index + 1 >= LIMIT) {
              handleLoadMore()
            }
          }}
          itemContent={(_, groupItem) => {
            console.log("🚀 ~ groupItem:", groupItem)
            const isActive = Number(chatId) === groupItem.groupId
            return (
              <div
                key={groupItem.id}
                aria-selected={isActive}
                onClick={() => navigate(`/chat/${groupItem.groupId}`)}
                className={twMerge(
                  "hover-light-effect group/item group relative mx-4 mb-2 gap-2 rounded-full px-2 py-2",
                  isActive && "bg-mercury-100",
                )}
              >
                <AvatarContainer
                  badgeIcon={<FilledUserIcon size={14} />}
                  avatarUrl={getAvatarGroupChat(
                    groupItem.userId,
                    groupItem.group.userA,
                    groupItem.group.userB,
                  )}
                  userName={groupItem.group.name}
                  badgeClassName="bg-[#0FE9A4]"
                />
                <div
                  className={twMerge(
                    "absolute -left-[17px] top-1/2 w-[5px] -translate-y-1/2 bg-lgd-code-agent-1 opacity-0 transition-all duration-300 ease-linear",
                    !isActive &&
                      "h-3 rounded-br-lg rounded-tr-lg group-hover/item:opacity-100",
                    isActive &&
                      "block h-10 rounded-br-full rounded-tr-full opacity-100",
                  )}
                />
                <MoreChatAction groupId={groupItem.groupId} />
              </div>
            )
          }}
        />
      </div>
    </>
  )
}
export default MessagesContainer
