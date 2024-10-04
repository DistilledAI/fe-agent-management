import AvatarContainer from "@components/AvatarContainer"
import DotLoading from "@components/DotLoading"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { FilledUserIcon, FilledUsersPlusIcon } from "@components/Icons/UserIcon"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Virtuoso } from "react-virtuoso"
import { twMerge } from "tailwind-merge"
import ActiveEffect from "./ActiveEffect"
import { getAvatarGroupChat, getRoleUser } from "./helpers"
import MoreChatAction from "./MoreChatAction"
import { ContentDisplayMode, DISPLAY_MODES } from "./PrivateAI"
import useFetchGroups from "./useFetchGroups"
import useGroupSocket from "./useGroupSocket"
import { RoleUser } from "@constants/index"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { IUser } from "@reducers/user/UserSlice"

const LIMIT = 10

const MessagesContainer: React.FC<ContentDisplayMode> = ({
  onChangeDisplayMode,
}) => {
  const { fetchGroups, groups, isLoading, setGroups } = useFetchGroups()
  const [hasNotiList, setHasNotiList] = useState<Array<number>>([])
  useGroupSocket(setHasNotiList)
  const navigate = useNavigate()
  const { chatId } = useParams()
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(10)

  const isHasNoti = (groupId: number) => {
    if (groupId === Number(chatId)) return false
    return hasNotiList.includes(groupId)
  }

  const getIconGroup = (ownerId: number, userA: IUser, userB: IUser) => {
    return getRoleUser(ownerId, userA, userB) === RoleUser.USER ? (
      <FilledUserIcon size={14} />
    ) : (
      <FilledBrainAIIcon size={14} />
    )
  }

  const getColorGroupIcon = (ownerId: number, userA: IUser, userB: IUser) => {
    return getRoleUser(ownerId, userA, userB) === RoleUser.USER
      ? "bg-[#0FE9A4]"
      : "bg-[#FC0]"
  }

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
              isLoading && groups.length > 0 ? (
                <div className="flex items-center justify-center">
                  <DotLoading />
                </div>
              ) : (
                <></>
              ),
          }}
          increaseViewportBy={500}
          endReached={(index) => {
            if (index + 1 >= LIMIT) {
              handleLoadMore()
            }
          }}
          itemContent={(_, groupItem) => {
            const isActive = Number(chatId) === groupItem.groupId
            return (
              <div
                key={groupItem.id}
                aria-selected={isActive}
                onClick={() => {
                  setHasNotiList((prev) =>
                    prev.filter((id) => id !== groupItem.groupId),
                  )
                  navigate(`/chat/${groupItem.groupId}`)
                }}
                className={twMerge(
                  "hover-light-effect group/item group relative mx-4 mb-2 gap-2 rounded-full px-2 py-2",
                  isActive && "bg-mercury-100",
                )}
              >
                <AvatarContainer
                  badgeIcon={getIconGroup(
                    groupItem.userId,
                    groupItem.group.userA,
                    groupItem.group.userB,
                  )}
                  avatarUrl={getAvatarGroupChat(
                    groupItem.userId,
                    groupItem.group.userA,
                    groupItem.group.userB,
                  )}
                  userName={groupItem.group.name}
                  badgeClassName={getColorGroupIcon(
                    groupItem.userId,
                    groupItem.group.userA,
                    groupItem.group.userB,
                  )}
                />
                <ActiveEffect isActive={isActive} />
                <div
                  aria-checked={isHasNoti(groupItem.groupId)}
                  className="absolute left-[10px] top-[10px] hidden h-2 w-2 rounded-full bg-red-600 aria-checked:block"
                ></div>
                <MoreChatAction
                  setGroups={setGroups}
                  groupId={groupItem.groupId}
                />
              </div>
            )
          }}
        />
      </div>
    </>
  )
}
export default MessagesContainer
