import endpoint from "./endpoint"
import { fetchApiAuth } from "./fetchApi"

export const getAgentDetail = async (botId: number) => {
  return fetchApiAuth({
    method: "GET",
    url: endpoint.GET_AGENT_DETAIL(botId),
  })
}
