import { CLEAR_CACHED_MESSAGES, RoleUser } from "@constants/index"
import { TypeGroup } from "../LeftBar/useFetchGroups"
import { IMessage } from "./useFetchMessages"

export enum RoleChat {
  OWNER = "owner",
  CUSTOMER = "customer",
}

export interface IMessageBox {
  id: number | string
  role: RoleChat
  roleOwner: RoleUser
  content: string
  avatar?: string
  isTyping?: boolean
  index?: number
  typeGroup?: TypeGroup
  createdAt: string
  publicAddress?: string
  isChatCleared?: boolean
  username?: string
  agentId?: number
  ownerId?: number
}

const isOwner = (currentUserId: number, userId: number) => {
  return currentUserId === userId
}

const getRole = (isOwner: boolean): RoleChat =>
  isOwner ? RoleChat.OWNER : RoleChat.CUSTOMER

export const convertDataFetchToMessage = (
  data: IMessage[],
  currentUserId: number,
): IMessageBox[] => {
  return data
    .map((mess) => ({
      id: mess.id,
      role: getRole(isOwner(currentUserId, mess.user?.id)),
      content: mess.messages,
      avatar: mess.user?.avatar,
      roleOwner: mess.user.role,
      typeGroup: mess.group.typeGroup,
      createdAt: mess.createdAt,
      publicAddress: mess.user?.publicAddress,
      isChatCleared: false,
      username: mess?.user?.username,
      agentId: mess.user.id,
      ownerId: mess.user.owner,
    }))
    .reverse()
}

export const getBadgeColor = (role: RoleUser) =>
  role === RoleUser.BOT ? "bg-[#FC0]" : "bg-[#0FE9A4]"

export const getTimeDiff = (date1: string, date2: string): number => {
  const time1 = new Date(date1).getTime()
  const time2 = new Date(date2).getTime()

  return (time1 - time2) / 1000
}

const TIME_BREAK = 10

export const groupedMessages = (
  index: number,
  message: IMessageBox,
  messages: IMessageBox[],
) => {
  let groupType = "none"
  const prevMsg = messages[index - 1]
  const nextMsg = messages[index + 1]

  const prevTimeDiff = getTimeDiff(message?.createdAt, prevMsg?.createdAt)
  const nextTimeDiff = getTimeDiff(nextMsg?.createdAt, message?.createdAt)
  const isPrevClearContextMsg = prevMsg?.content === CLEAR_CACHED_MESSAGES
  const isNextClearContextMsg = nextMsg?.content === CLEAR_CACHED_MESSAGES

  if (prevMsg && prevMsg.role === RoleChat.OWNER && !isPrevClearContextMsg) {
    if (prevTimeDiff < TIME_BREAK) {
      if (
        nextMsg &&
        nextMsg.role === RoleChat.OWNER &&
        nextTimeDiff < TIME_BREAK
      ) {
        groupType = "middle"
      } else {
        groupType = "bottom"
      }
    } else {
      groupType = "top"
      if (
        !nextMsg ||
        nextMsg.role !== message.role ||
        nextTimeDiff > TIME_BREAK
      ) {
        groupType = "none"
      }
    }
  } else {
    groupType =
      nextMsg &&
      nextMsg.role === RoleChat.OWNER &&
      nextTimeDiff < TIME_BREAK &&
      !isNextClearContextMsg
        ? "top"
        : "none"
  }

  const borderRadiusStyle = {
    none: "",
    top: "rounded-t-[20px] rounded-bl-[20px] rounded-br",
    middle: "rounded-tr rounded-br rounded-tl-[20px] rounded-bl-[20px]",
    bottom: "rounded-tr",
  }[groupType]

  const paddingBottomStyle = {
    none: "pb-4",
    top: "pb-[3px]",
    middle: "pb-[3px]",
    bottom: "pb-4",
  }[groupType]

  return {
    borderRadiusStyle,
    paddingBottomStyle,
  }
}
