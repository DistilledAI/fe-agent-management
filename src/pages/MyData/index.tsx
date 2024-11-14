import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import useWindowSize from "@hooks/useWindowSize"
import { Button } from "@nextui-org/react"
import { BotDataTypeKey } from "@types"
import { useNavigate } from "react-router-dom"
import AddData from "./AddData"
import CvData from "./Cv"
import FileData from "./File"
import { getTimeLastCollected } from "./helpers"
import LinkData from "./Link"
import MediaData from "./Media"
import useFetchMyData from "./useFetch"
import useUpdateStatus from "./useUpdateStatus"
import { InfoCircleIcon } from "@components/Icons/InfoCircleIcon"
import { QueryDataKeys } from "types/queryDataKeys"
import { useQuery } from "@tanstack/react-query"
import { STATUS_AGENT } from "@constants/index"

const MyData: React.FC = () => {
  const { isMobile } = useWindowSize()
  const navigate = useNavigate()
  const { list, isLoading, isFetched, botId } = useFetchMyData()
  const lastCollected = getTimeLastCollected(list)
  useUpdateStatus(botId)
  const { data: dtAgent }: { data: any } = useQuery({
    queryKey: [QueryDataKeys.MY_BOT_LIST],
    refetchOnWindowFocus: false,
  })
  const isBotActive = dtAgent?.data?.items?.[0]?.status === STATUS_AGENT.ACTIVE

  return (
    <div className="mx-auto max-w-[800px] px-4 py-5 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[70px]">
      {isMobile ? (
        <div className="fixed left-0 top-0 z-[1] flex h-[55px] w-full items-center justify-between bg-white px-4">
          <Button
            onClick={() => navigate(-1)}
            className="h-9 w-9 min-w-0 rounded-full bg-mercury-70 p-0"
          >
            <ArrowLeftFilledIcon />
          </Button>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold text-mercury-900">
            My Data
          </div>
          <AddData botId={botId} />
        </div>
      ) : (
        <div className="mb-7 flex items-center justify-between">
          <div className="text-mercury-950">
            <h3 className="mb-1 text-24 font-semibold">My data</h3>
            <div className="inline-flex items-center text-mercury-800">
              <span>Last collected:</span>
              <span className="ml-1 font-semibold">
                {!isLoading && isFetched ? lastCollected : "..."}
              </span>
            </div>
          </div>
          <AddData botId={botId} />
        </div>
      )}
      {list.length > 0 && (
        <div className="mb-5 inline-flex items-center text-mercury-800 md:hidden">
          <span>Last collected:</span>
          <span className="ml-1 font-semibold">{lastCollected}</span>
        </div>
      )}
      {!isBotActive && (
        <div className="mb-6 flex items-center gap-6 rounded-lg border border-brown-500 bg-brown-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <div>
              <InfoCircleIcon size={28} color="#83664B" />
            </div>
            <p className="text-brown-600 text-14 font-medium md:text-16">
              Your agent is in the process of being created, you can't sync data
              for your agent yet. This process typically takes around 6 hours.
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-6">
        <LinkData botId={botId} category={BotDataTypeKey.SOCIAL_MEDIA} />
        <FileData botId={botId} category={BotDataTypeKey.PDF_FILE} />
        <CvData botId={botId} category={BotDataTypeKey.CV_FILE} />
        <MediaData botId={botId} category={BotDataTypeKey.PHOTO_VIDEO_FILE} />
      </div>
    </div>
  )
}
export default MyData
