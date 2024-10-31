import AvatarContainer from "@components/AvatarContainer"
import AvatarGroup from "@components/AvatarGroup"
import DotLoading from "@components/DotLoading"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { FilledUserIcon, FilledUsersPlusIcon } from "@components/Icons/UserIcon"
import { PATH_NAMES, RoleUser } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import { IUser } from "@reducers/userSlice"
import { useQueryClient } from "@tanstack/react-query"
import { getActiveColorRandomById } from "@utils/index"
import { useNavigate, useParams } from "react-router-dom"
import { Virtuoso } from "react-virtuoso"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import DotNotification from "../DotNotification"
import ActiveEffect from "./ActiveEffect"
import {
  getAvatarGroupChat,
  getColorGroupIcon,
  getNameGroup,
  getPublicAddressGroupChat,
  getRoleUser,
} from "./helpers"
import MoreChatAction from "./MoreChatAction"
import { ContentDisplayMode, DISPLAY_MODES } from "./PrivateAI"
import useFetchGroups, { LIMIT, TypeGroup, UserGroup } from "./useFetchGroups"
import { ConfigBotType } from "@types"

const MessagesContainer: React.FC<ContentDisplayMode> = ({
  onChangeDisplayMode,
}) => {
  const { groups, isLoading, handleLoadMore } = useFetchGroups()
  const { user } = useAuthState()
  const navigate = useNavigate()
  const { chatId } = useParams()
  const queryClient = useQueryClient()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  const getIconGroup = (ownerId: number, userA: IUser, userB: IUser) => {
    return getRoleUser(ownerId, userA, userB) === RoleUser.USER ? (
      <FilledUserIcon size={14} />
    ) : (
      <FilledBrainAIIcon size={14} />
    )
  }

  const mapColorsToGroups = (groups: UserGroup[]) => {
    return groups.map((group) => {
      const groupId = group.groupId
      const { bgColor } = getActiveColorRandomById(groupId)
      return {
        ...group,
        bgColor,
      }
    })
  }

  return (
    <>
      <div
        className={twMerge(
          "mb-4 flex items-center justify-between px-2",
          sidebarCollapsed && "justify-center",
        )}
      >
        <h6 className={twMerge("text-[14px]", sidebarCollapsed && "hidden")}>
          Messages
        </h6>
        <div className="flex items-center gap-4">
          <div className={twMerge("opacity-30", sidebarCollapsed && "hidden")}>
            <FilledUsersPlusIcon />
          </div>
          <div
            onClick={() => {
              onChangeDisplayMode(DISPLAY_MODES.SEARCH)
            }}
            className="cursor-pointer"
          >
            <FilledSearchIcon />
          </div>
        </div>
      </div>

      <div className="-mx-4 h-full max-h-[calc(100%-143px)]">
        <Virtuoso
          style={{ height: "100%" }}
          data={mapColorsToGroups(groups)}
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
                  queryClient.setQueryData<number[]>(
                    [QueryDataKeys.NOTIFICATION_GROUPS],
                    (prev = []) =>
                      prev.filter((id) => id !== groupItem.groupId),
                  )

                  const configBot = groupItem?.group?.userB?.configBot
                  if (configBot === ConfigBotType.LIVE) {
                    return navigate(
                      `${PATH_NAMES.CHAT_LIVE}/${groupItem.groupId}`,
                    )
                  }
                  navigate(`${PATH_NAMES.CHAT}/${groupItem.groupId}`)
                }}
                className={twMerge(
                  "hover-light-effect group/item group relative mx-4 mb-2 h-14 gap-2 rounded-full px-2 py-2",
                  isActive && "bg-mercury-100",
                  sidebarCollapsed &&
                    "flex w-14 items-center justify-center p-0",
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
                    publicAddress={getPublicAddressGroupChat(
                      groupItem.userId,
                      groupItem.group.userA,
                      groupItem.group.userB,
                    )}
                    userName={
                      sidebarCollapsed
                        ? ""
                        : getNameGroup(
                            user,
                            groupItem.group.userA,
                            groupItem.group.userB,
                          )
                    }
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
                <DotNotification groupId={groupItem.groupId} />
                {sidebarCollapsed ? (
                  <></>
                ) : (
                  <MoreChatAction groupId={groupItem.groupId} />
                )}
              </div>
            )
          }}
        />
      </div>
    </>
  )
}
export default MessagesContainer
