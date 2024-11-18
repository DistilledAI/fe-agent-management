import endpoint from "./endpoint"
import { fetchApiAuth } from "./fetchApi"

export const getUser = async () => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_USER,
  })
}

interface IUserUpdate {
  username?: string
  avatar?: string
  description?: string
}
export const updateUser = async (data: IUserUpdate) => {
  return fetchApiAuth({
    method: "POST",
    url: endpoint.UPDATE_USER,
    data,
  })
}

export const updateAvatarUser = async (data: FormData) => {
  return fetchApiAuth({
    method: "POST",
    url: endpoint.UPDATE_AVATAR_USER,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

export const uploadMyData = async (file: any) => {
  return fetchApiAuth({
    method: "POST",
    url: endpoint.UPLOAD_MY_DATA,
    data: file,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

export const mapMyDataToBot = async (payload: any) => {
  const data = payload?.data
  if (!data || data.length === 0) return

  return fetchApiAuth({
    method: "POST",
    url: endpoint.MAP_MY_DATA_TO_BOT,
    data: payload,
  })
}

export const getMyBotData = async (
  botId: number,
  params: { limit: number; offset: number; filter?: string },
) => {
  return fetchApiAuth({
    method: "GET",
    url: endpoint.GET_MY_BOT_DATA(botId),
    params,
  })
}

export const deleteMyBotData = async (data: {
  botId: number
  ids: number[]
}) => {
  return fetchApiAuth({
    method: "POST",
    url: endpoint.DELETE_MY_BOT_DATA,
    data,
  })
}

export const getUserPublicDetail = async (userId: number) => {
  return fetchApiAuth({
    method: "GET",
    url: endpoint.GET_USER_PUBLIC_DETAIL,
    params: {
      filter: JSON.stringify({
        userId,
      }),
    },
  })
}
