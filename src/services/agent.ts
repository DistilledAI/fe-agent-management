import endpoint from "./endpoint"
import { fetchApiAuth } from "./fetchApi"

export const getAgentDetail = async (botId: number) => {
  return fetchApiAuth({
    method: "GET",
    url: endpoint.GET_AGENT_DETAIL(botId),
  })
}

export const getPublicAgentsByOwner = async (ownerId: number) => {
  return fetchApiAuth({
    method: "GET",
    url: endpoint.GET_BOT_PUBLIC_BY_OWNER(ownerId),
    params: {
      filter: JSON.stringify({
        publish: 1,
      }),
    },
  })
}

interface UploadAgentPayload {
  botId: number
  avatar?: string
  username?: string
  description?: string
  email?: string
  firstMsg?: string
}

export const updateAgent = async (data: UploadAgentPayload) => {
  return fetchApiAuth({
    method: "POST",
    url: endpoint.UPDATE_AGENT,
    data,
  })
}
interface TelegramMapAgentPayload {
  token: string
  botId: number
}

export const telegramMapAgent = async (data: TelegramMapAgentPayload) => {
  return fetchApiAuth({
    method: "POST",
    url: endpoint.TELEGRAM_MAP_AGENT,
    data,
  })
}
