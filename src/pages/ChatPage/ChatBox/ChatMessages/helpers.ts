import { IMessage } from "../useFetchMessages"

export enum RoleChat {
  OWNER = "owner",
  CUSTOMER = "customer",
}

export interface IMessageBox {
  role: RoleChat
  content: string
}

const isOwner = (currentUserId: number, userId: number) =>
  currentUserId === userId

const getRole = (isOwner: boolean): RoleChat =>
  isOwner ? RoleChat.OWNER : RoleChat.CUSTOMER

export const convertDataFetchToMessage = (
  data: IMessage[],
  currentUserId: number,
): IMessageBox[] => {
  return data
    .map((mess) => ({
      role: getRole(isOwner(currentUserId, mess.userId)),
      content: mess.messages,
    }))
    .reverse()
}
