import endpoint from "./endpoint"
import { fetchApiAuth } from "./fetchApi"

export const getPredictHistory = async () => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_PREDICT_HISTORY,
  })
}

export const getCurrentPredictRound = async () => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_CURRENT_PREDICT_ROUND,
  })
}

export const getHistoryByUser = async (userId: string) => {
  return fetchApiAuth({
    method: "get",
    url: `${endpoint.GET_HISTORY_AGENT_LAND_URL}?user=${userId}`,
  })
}

export const getHistoryEvents = async (eventIds: string) => {
  return fetchApiAuth({
    method: "get",
    url: `${endpoint.GET_EVENT_INFO_AGENT_LAND_URL}?events=${eventIds}`,
  })
}
