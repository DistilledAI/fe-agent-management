import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { DatabaseImportIcon } from "@components/Icons/DatabaseImportIcon"
import { PDFTypeIcon } from "@components/Icons/PDFTypeIcon"
import { PhotoPlusIcon } from "@components/Icons/PhotoPlusIcon"
import { ThreeDotsIcon } from "@components/Icons/SocialLinkIcon"
import { TYPE_DATA_KEY } from "./CreatePrivateAgent"
import UploadCustom from "./UploadCustom"
import UploadSocialLink from "./UploadSocialLink"

const ConnectData: React.FC = () => {
  return (
    <>
      <div className="absolute top-[53%] flex -translate-y-1/2 items-center justify-center text-center">
        <span className="text-base text-mercury-800">Max file size: 50MB</span>
      </div>
      <div className="absolute top-[50px] h-full w-[650px]">
        <div className="mb-12 flex flex-col items-center justify-center text-center">
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
        <div className="">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <UploadSocialLink />
              <UploadCustom
                fieldkey="uploadCV"
                fileKey={TYPE_DATA_KEY.CV_FILE}
                icon={<PDFTypeIcon />}
                label="CV"
              />
            </div>
            <div className="flex flex-col gap-6">
              <UploadCustom
                fieldkey="uploadPDFs"
                fileKey={TYPE_DATA_KEY.PDF_FILE}
                icon={<PDFTypeIcon />}
                label="PDFs"
              />
              <UploadCustom
                fieldkey="photosVideos"
                fileKey={TYPE_DATA_KEY.PHOTO_VIDEO_FILE}
                icon={<PhotoPlusIcon />}
                label="Photos & Videos"
                accept="image/*,video/*"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ConnectData
