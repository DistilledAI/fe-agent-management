import { CheckedIcon } from "@components/Icons/Checked"
import { InfoCircleIcon } from "@components/Icons/InfoCircleIcon"
import { RefreshIcon } from "@components/Icons/RefreshIcon"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { trainData } from "services/chat"
import { match } from "ts-pattern"
import useCheckBotActive from "../useCheckBotActive"
import InfoWarningModal from "../Components/InfoWarningModal"
import { getValueInfoWarning } from "../helpers"
import { MY_DATA_STATUS } from "@constants/index"
import { twMerge } from "tailwind-merge"

interface SyncDataProps {
  dataId: number
  botId: number
  status: MY_DATA_STATUS
}

const SyncData: React.FC<SyncDataProps> = ({
  dataId,
  botId,
  status: dataStatus,
}) => {
  const [status, setStatus] = useState<MY_DATA_STATUS>(dataStatus)
  const [loading, setLoading] = useState(false)
  const { isBotActive } = useCheckBotActive()

  useEffect(() => {
    setStatus(dataStatus)
  }, [dataStatus])

  const handleSyncData = async () => {
    try {
      if (!isBotActive || loading) return
      setLoading(true)
      const response = await trainData({
        botId,
        id: dataId,
      })
      if (response?.status === 201) {
        setStatus(MY_DATA_STATUS.PROCESSING)
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
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
        <div className="flex items-center gap-1 font-semibold text-[#A2845E] hover:underline">
          Syncing...
        </div>
      ))
      .otherwise(() => (
        <div
          className={twMerge(
            "flex cursor-pointer items-center gap-1 hover:underline",
            loading && "pointer-events-none opacity-60",
          )}
          onClick={handleSyncData}
        >
          <RefreshIcon color="#F78500" />
          <span className="text-base-14-sb italic text-[#F78500]">Sync</span>
        </div>
      ))
  }

  return (
    <InfoWarningModal
      title={getValueInfoWarning(status).title}
      description={getValueInfoWarning(status).description}
      isShow={!isBotActive || status === MY_DATA_STATUS.PROCESSING}
    >
      {renderSyncStatus()}
    </InfoWarningModal>
  )
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
