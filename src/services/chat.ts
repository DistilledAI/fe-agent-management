import endpoint from "./endpoint"
import { fetchApiAuth } from "./fetchApi"

export const getGroupList = async () => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_MY_CHAT_GROUP_LIST,
  })
}

interface IDataChatSendToUser {
  toUserId: number
  messages: string
}
export const postChatSendToUser = async (data: IDataChatSendToUser) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.CHAT_SEND_TO_USER,
    data,
  })
}

interface IDataChatToGroup {
  groupId: number
  messages: string
}
export const postChatToGroup = async (data: IDataChatToGroup) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.CHAT_TO_GROUP,
    data,
  })
}

interface IDataCreateGroupChat {
  members: Array<number>
}
export const createGroupChat = async (data: IDataCreateGroupChat) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.CREATE_GROUP_CHAT,
    data,
  })
}

export const checkGroupDirect = async (data: IDataCreateGroupChat) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.CHAT_GROUP_DIRECT,
    data,
  })
}

export const getChatHistoryById = async ({
  id,
  offset = 0,
  limit = 20,
}: {
  id: number
  offset?: number
  limit?: number
}) => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_HISTORY_CHAT(id),
    params: {
      offset,
      limit,
    },
  })
}

export const getUserById = async (keyword: string) => {
  return fetchApiAuth({
    method: "post",
    url: endpoint.SEARCH_USER,
    data: { key: keyword },
  })
}

export const checkConversation = async (userToId: number) => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.CHECK_CONVERSATION_CHAT(userToId),
  })
}
