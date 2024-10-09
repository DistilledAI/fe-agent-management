import { RoleUser } from "@constants/index"
import { IMessage } from "./useFetchMessages"
import { TypeGroup } from "../LeftBar/useFetchGroups"

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
      role: getRole(isOwner(currentUserId, mess.userId)),
      content: mess.messages,
      avatar: mess.user?.avatar,
      roleOwner: mess.user.role,
      typeGroup: mess.group.typeGroup,
      createdAt: mess.createdAt,
    }))
    .reverse()
}
