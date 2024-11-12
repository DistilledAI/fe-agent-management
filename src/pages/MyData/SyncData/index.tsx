import { LoadingDataIcon } from "@components/Icons"
import { CheckedIcon } from "@components/Icons/Checked"
import { InfoCircleIcon } from "@components/Icons/InfoCircleIcon"
import { RefreshIcon } from "@components/Icons/RefreshIcon"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { trainData } from "services/chat"
import { match } from "ts-pattern"

interface SyncDataProps {
  dataId: number
  botId: number
  status: MY_DATA_STATUS
}

export enum MY_DATA_STATUS {
  ACTIVE = 1,
  PROCESSING = 0,
  RESOLVED = 4,
  SUSPENDED = 2,
  DELETED = 3,
}

const SyncData: React.FC<SyncDataProps> = ({
  dataId,
  botId,
  status: dataStatus,
}) => {
  const [status, setStatus] = useState<MY_DATA_STATUS>(dataStatus)

  useEffect(() => {
    setStatus(dataStatus)
  }, [dataStatus])

  const handleSyncData = async () => {
    try {
      const response = await trainData({
        botId,
        id: dataId,
      })
      if (response?.status === 201) {
        setStatus(MY_DATA_STATUS.PROCESSING)
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }

  const renderSyncStatus = () => {
    return match(status)
      .with(MY_DATA_STATUS.RESOLVED, () => (
        <div className="flex items-center gap-1 font-semibold text-green-500">
          <CheckedIcon size={16} />
          Synced
        </div>
      ))
      .with(MY_DATA_STATUS.PROCESSING, () => (
        <div className="flex items-center gap-1 font-semibold text-[#A2845E]">
          <LoadingDataIcon />
          Syncing...
        </div>
      ))
      .otherwise(() => (
        <div
          className="flex cursor-pointer items-center gap-1 hover:underline"
          onClick={handleSyncData}
        >
          <RefreshIcon color="#F78500" />
          <span className="text-base-14-sb italic text-[#F78500]">Sync</span>
        </div>
      ))
  }

  return <>{renderSyncStatus()}</>
}

export const SyncLabel = () => {
  return (
    <div className="flex w-full items-center justify-end gap-1 max-sm:mt-1 max-sm:justify-start">
      <InfoCircleIcon />
      <span className="text-base-14-sb italic text-[#F78500]">
        Sync agents with new data
      </span>
    </div>
  )
}
export default SyncData
