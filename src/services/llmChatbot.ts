import { fetchApi } from "./fetchApi"

interface FeedbackType {
  userId: string
  chatId: string
  content: string
  reaction_status: string
}
interface HistoriesType {
  id: string
  userId: string
  sessionId: string
  message: string
  answer: string
  walletAddress?: string
  interestTokens?: any[]
  site?: string
  signedMessage?: string
}

const baseURL = import.meta.env.VITE_APP_BASE_LLM_URL

export const getSuggestionList = async () => {
  const config = {
    baseURL,
    url: "/suggestions",
    method: "GET",
  }
  const res = await fetchApi.request(config)
  return res?.data
}

export const postFeedback = async (data: FeedbackType) => {
  const config = {
    baseURL,
    url: "/chat/feedbacks",
    method: "POST",
    data,
  }
  const res = await fetchApi.request(config)
  return res?.data
}

export const postHistories = async (data: HistoriesType) => {
  const config = {
    baseURL,
    url: "/chat/histories",
    method: "POST",
    data,
  }
  const res = await fetchApi.request(config)
  return res?.data
}
