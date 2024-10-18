import AvatarContainer from "@components/AvatarContainer"
import DotLoading from "@components/DotLoading"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { FilledUserIcon, FilledUsersPlusIcon } from "@components/Icons/UserIcon"
import { useNavigate, useParams } from "react-router-dom"
import { Virtuoso } from "react-virtuoso"
import { twMerge } from "tailwind-merge"
import ActiveEffect from "./ActiveEffect"
import {
  getAvatarGroupChat,
  getColorGroupIcon,
  getNameGroup,
  getRoleUser,
  isHasNotification,
} from "./helpers"
import MoreChatAction from "./MoreChatAction"
import { ContentDisplayMode, DISPLAY_MODES } from "./PrivateAI"
import useFetchGroups, { LIMIT, TypeGroup } from "./useFetchGroups"
import { ACTIVE_COLORS, RoleUser } from "@constants/index"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { IUser } from "@reducers/user/UserSlice"
import { useChatMessage } from "providers/MessageProvider"
import useAuthState from "@hooks/useAuthState"
import AvatarGroup from "@components/AvatarGroup"
import { ActiveColorState, updateActiveColor } from "@reducers/activeColorSlice"
import { useAppDispatch } from "@hooks/useAppRedux"

const MessagesContainer: React.FC<ContentDisplayMode> = ({
  onChangeDisplayMode,
}) => {
  const dispatch = useAppDispatch()
  const { groups, isLoading, setGroups, handleLoadMore } = useFetchGroups()
  const {
    groupsHaveNotification,
    setGroupsHaveNotification,
    setIsNewMsgOnCurrentWindow,
  } = useChatMessage()
  const { user } = useAuthState()
  const navigate = useNavigate()
  const { chatId } = useParams()

  const getIconGroup = (ownerId: number, userA: IUser, userB: IUser) => {
    return getRoleUser(ownerId, userA, userB) === RoleUser.USER ? (
      <FilledUserIcon size={14} />
    ) : (
      <FilledBrainAIIcon size={14} />
    )
  }

  const mapColorsToGroups = (
    colors: Array<ActiveColorState>,
    groups: any[],
  ) => {
    return groups.map((group) => {
      const groupId = group.groupId
      const bgColor = colors[groupId % colors.length].bgColor
      return {
        ...group,
        bgColor,
      }
    })
  }

  return (
    <>
      <div className="flex-items-center mb-4 justify-between px-2">
        <span className="text-base-14">Messages</span>
        <div className="flex-items-center gap-4">
          <div className="opacity-30">
            <FilledUsersPlusIcon />
          </div>
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
          data={mapColorsToGroups(ACTIVE_COLORS, groups)}
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
            if (isActive) {
              dispatch(
                updateActiveColor({
                  bgColor: groupItem.bgColor,
                }),
              )
            }

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
                className={twMerge(
                  "hover-light-effect group/item group relative mx-4 mb-2 gap-2 rounded-full px-2 py-2",
                  isActive && "bg-mercury-100",
                )}
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
                <ActiveEffect
                  isActive={isActive}
                  className={groupItem.bgColor}
                />
                <div
                  aria-checked={isHasNotification(
                    groupsHaveNotification,
                    groupItem.groupId,
                    Number(chatId),
                  )}
                  className="absolute left-[10px] top-[10px] hidden h-2 w-2 rounded-full bg-red-600 aria-checked:block"
                />
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
