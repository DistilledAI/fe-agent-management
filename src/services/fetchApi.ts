import axios, { AxiosError, AxiosResponse } from "axios"
import TokenService from "./token"
import { getAccessToken } from "@utils/storage"

export const METHODS = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
}

export const fetchApi = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
})

export const fetchApiAuth = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
})

fetchApiAuth.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken()

    if (!accessToken) {
      return config
    }
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

const dispatchEventStorage = () => {
  const event = new StorageEvent("storage", {
    key: "logout",
  })
  return window.dispatchEvent(event)
}

fetchApiAuth.interceptors.response.use(
  (res: AxiosResponse) => {
    return res
  },
  async (error) => {
    const originalRequest = error.config
    if (originalRequest.url !== "/auth/login" && error.response) {
      const token = TokenService.getLocalToken()
      const currentTimestamp = Math.floor(Date.now() / 1000)
      if (token && token.expireAt && token.expireAt < currentTimestamp) {
        dispatchEventStorage()
      }
    }

    return Promise.reject(error)
  },
)
