import { BotDataTypeKey } from "@types"
import moment from "moment"
import { IBotData } from "types/user"
import { match } from "ts-pattern"
import { MY_DATA_STATUS } from "@constants/index"

export const getBotDataByKey = (key: BotDataTypeKey, data: IBotData[]) => {
  return data.filter((item) => item.key === key)
}

export const getTimeLastCollected = (data: IBotData[]) => {
  const time = data[0]?.createdAt
  return time ? moment(time).fromNow() : "You have not collected any data yet"
}

export const getValueInfoWarning = (status: MY_DATA_STATUS) => {
  return match(status)
    .returnType<{ title: string; description: string }>()
    .with(MY_DATA_STATUS.PROCESSING, () => ({
      title: "Syncing",
      description:
        "Your data is being synced! This process typically takes up to 6 hours.",
    }))
    .otherwise(() => ({
      title: "Sync is unavailable",
      description:
        "Your agent is being created. Data sync is unavailable for now. Please check back when your agent is ready.",
    }))
}

export const hasSyncData = (data: IBotData[]) =>
  Boolean(
    data.find(
      (item) =>
        item.status === MY_DATA_STATUS.ACTIVE ||
        item.status === MY_DATA_STATUS.SUSPENDED,
    ),
  )

export const hasSyncDataByStatus = (status: MY_DATA_STATUS) => {
  return status === MY_DATA_STATUS.ACTIVE || status === MY_DATA_STATUS.SUSPENDED
}
