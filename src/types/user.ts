import { BotDataTypeKey } from "@types"

export interface IUserDetail {
  id: number
  avatar: string | null
  username: string
  publicAddress: string | null
  typeLogin: string
  description: string | null
  firstMsg: string | null
  configBot: string | null
  owner: number
  typeBot: number
  webhook: string | null
  webhookTelegram: string | null
  webhookDiscord: string | null
  linkedin: string | null
  email: string | null
  role: number
  status: number
  createdAt: string
}

export interface IBotData {
  createdAt: string
  id: number
  key: BotDataTypeKey
  name: string
  size: number
  type: string
  userId: number
  value: string
  user: IUserDetail
}

export interface IAgentData {
  id: number
  avatar: string | null
  username: string
  publicAddress: string | null
  typeLogin: string
  description: string | null
  firstMsg: string | null
  configBot: string | null
  owner: number
  typeBot: number
  webhook: string | null
  webhookTelegram: string | null
  webhookDiscord: string | null
  linkedin: string
  email: string
  role: number
  ccId: number | null
  status: number
  createdAt: string
}
