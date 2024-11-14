import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { DatabaseImportIcon } from "@components/Icons/DatabaseImportIcon"
import { PDFTypeIcon } from "@components/Icons/PDFTypeIcon"
import { PhotoPlusIcon } from "@components/Icons/PhotoPlusIcon"
import { ThreeDotsIcon } from "@components/Icons/SocialLinkIcon"
import { TYPE_DATA_KEY } from "../CreatePrivateAgent"
import UploadCustom from "../UploadCustom"
import UploadSocialLink from "../UploadSocialLink"
import { InfoCircleIcon } from "@components/Icons/InfoCircleIcon"
import { Link, useParams } from "react-router-dom"
import { PATH_NAMES, STATUS_AGENT } from "@constants/index"
import { useQuery } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"
import { TxtIcon } from "@components/Icons/TextIcon"

const ConnectData = () => {
  const { botId } = useParams()
  const { data } = useQuery<any>({
    queryKey: [QueryDataKeys.MY_BOT_LIST],
    refetchOnWindowFocus: false,
  })
  const agent =
    data?.data?.items?.length > 0
      ? data?.data?.items?.find((agent: any) => agent?.id?.toString() === botId)
      : null
  const showEstimateBanner = agent && agent?.status !== STATUS_AGENT.ACTIVE

  return (
    <>
      <div className="absolute top-[53%] flex -translate-y-1/2 items-center justify-center text-center">
        <span className="text-base text-mercury-800">Max file size: 50MB</span>
      </div>
      <div className="absolute top-[50px] h-full w-full max-w-[768px]">
        <div className="mb-6 flex flex-col items-center justify-center text-center">
          <div className="flex-items-center gap-1">
            <FilledBrainAIIcon color="#A2845E" size={24} />
            <ThreeDotsIcon />
            <DatabaseImportIcon />
          </div>
          <span className="text-24">
            <span className="font-semibold">Start your Private Agent</span>
            <br />
            by connect your data:
          </span>
        </div>
        {showEstimateBanner ? (
          <div className="mb-6 flex items-center gap-6 rounded-lg border border-brown-500 bg-brown-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <InfoCircleIcon color="#83664B" />
              <p className="text-brown-600 text-16 font-medium">
                We appreciate your patience. This process typically takes around
                6 hours.
              </p>
            </div>
            <Link
              to={`${PATH_NAMES.MARKETPLACE}`}
              className="text-brown-600 text-16 font-bold hover:underline"
            >
              Chat with other agents
            </Link>
          </div>
        ) : (
          <></>
        )}

        <div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <UploadSocialLink />
              <UploadCustom
                fieldkey="uploadCV"
                fileKey={TYPE_DATA_KEY.CV_FILE}
                icon={<PDFTypeIcon />}
                label="CV"
                maxCount={3}
                multiple
              />
            </div>
            <div className="flex flex-col gap-6">
              <UploadCustom
                fieldkey="uploadPDFs"
                fileKey={TYPE_DATA_KEY.PDF_FILE}
                icon={<PDFTypeIcon />}
                label="PDFs"
                maxCount={3}
                multiple
              />
              <UploadCustom
                fieldkey="photosVideos"
                fileKey={TYPE_DATA_KEY.PHOTO_VIDEO_FILE}
                icon={<PhotoPlusIcon />}
                label="Photos & Videos"
                accept="image/*,video/*"
                maxCount={3}
                multiple
              />
            </div>
            <div className="flex flex-col gap-6">
              <UploadCustom
                fieldkey="photosVideos"
                fileKey={TYPE_DATA_KEY.TXT_FILE}
                icon={<TxtIcon />}
                label="Text files"
                accept=".txt,.md"
                maxCount={3}
                multiple
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ConnectData
