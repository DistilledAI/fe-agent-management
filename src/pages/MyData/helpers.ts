import { BotDataTypeKey } from "@types"
import moment from "moment"
import { IBotData } from "types/user"

export const getBotDataByKey = (key: BotDataTypeKey, data: IBotData[]) => {
  return data.filter((item) => item.key === key)
}

export const getTimeLastCollected = (data: IBotData[]) => {
  const time = data[0]?.createdAt
  return time
    ? moment(time).startOf("day").fromNow()
    : "You have not collected any data yet"
}
