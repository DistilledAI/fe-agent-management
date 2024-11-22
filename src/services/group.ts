import endpoint from "./endpoint"
import { fetchApiAuth } from "./fetchApi"

export const clearContextByGroupId = async (groupId: number) => {
  return fetchApiAuth({
    method: "DELETE",
    url: endpoint.CLEAR_CACHED_BY_GROUP_ID(groupId),
  })
}
