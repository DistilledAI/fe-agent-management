import AvatarContainer from "@components/AvatarContainer"
import AvatarGroup from "@components/AvatarGroup"
import DotLoading from "@components/DotLoading"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import { RoleUser } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import {
  getAvatarGroupChat,
  getColorGroupIcon,
  getNameGroup,
  getRoleUser,
  isHasNotification,
} from "@pages/ChatPage/ChatBox/LeftBar/helpers"
import useFetchGroups, {
  LIMIT,
  TypeGroup,
} from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import { IUser } from "@reducers/userSlice"

import { useChatMessage } from "providers/MessageProvider"
import { useNavigate, useParams } from "react-router-dom"
import { Virtuoso } from "react-virtuoso"
import { StartNewChat } from ".."

const ChatList = () => {
  const {
    groupsHaveNotification,
    setGroupsHaveNotification,
    setIsNewMsgOnCurrentWindow,
  } = useChatMessage()
  const { user } = useAuthState()
  const navigate = useNavigate()
  const { chatId } = useParams()
  const { groups, isLoading, handleLoadMore, isFetched } = useFetchGroups()

  const getIconGroup = (ownerId: number, userA: IUser, userB: IUser) => {
    return getRoleUser(ownerId, userA, userB) === RoleUser.USER ? (
      <FilledUserIcon size={14} />
    ) : (
      <FilledBrainAIIcon size={14} />
    )
  }

  if (isFetched && groups.length === 0 && !isLoading) return <StartNewChat />

  return (
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
              setGroupsHaveNotification((prev) =>
                prev.filter((id) => id !== groupItem.groupId),
              )
              setIsNewMsgOnCurrentWindow(false)
              navigate(`/chat/${groupItem.groupId}`)
            }}
            className="relative mb-2 gap-2 px-4 py-2"
          >
            {groupItem.group.typeGroup === TypeGroup.PRIVATE_GROUP ? (
              <AvatarGroup groupName={groupItem.group.name} />
            ) : (
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
                userName={getNameGroup(
                  user,
                  groupItem.group.userA,
                  groupItem.group.userB,
                )}
                badgeClassName={getColorGroupIcon(
                  groupItem.userId,
                  groupItem.group.userA,
                  groupItem.group.userB,
                )}
              />
            )}
            <div
              aria-checked={isHasNotification(
                groupsHaveNotification,
                groupItem.groupId,
                Number(chatId),
              )}
              className="absolute left-[10px] top-[10px] hidden h-2 w-2 rounded-full bg-red-600 aria-checked:block"
            ></div>
          </div>
        )
      }}
    />
  )
}

export default ChatList
