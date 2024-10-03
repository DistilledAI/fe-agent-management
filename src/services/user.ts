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
}
export const updateUser = async (data: IUserUpdate) => {
  return fetchApiAuth({
    method: "POST",
    url: endpoint.UPDATE_USER,
    data,
  })
}
