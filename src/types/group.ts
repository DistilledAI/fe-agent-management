import { TypeGroup } from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"

export interface IGroupDetail {
  id: number
  name: string
  image: string | null
  label: string
  userAId: number
  userBId: number
  createBy: number
  status: number
  live: number
  typeGroup: TypeGroup
  eventId: number
  createdAt: string
  description?: string
}
