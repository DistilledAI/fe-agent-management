import endpoint from "./endpoint"
import { fetchApiAuth } from "./fetchApi"

export const getUser = async () => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_USER,
  })
}
