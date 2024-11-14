import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { PDFTypeIcon } from "@components/Icons/PDFTypeIcon"
import { PhotoPlusIcon } from "@components/Icons/PhotoPlusIcon"
import { TYPE_DATA_KEY } from "../CreatePrivateAgent"
import UploadCustom from "../UploadCustom"
import UploadSocialLink from "../UploadSocialLink"
import { InfoCircleIcon } from "@components/Icons/InfoCircleIcon"
import { Link, useParams } from "react-router-dom"
import { PATH_NAMES, STATUS_AGENT } from "@constants/index"
import { useQuery } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"
import { borderGdImg } from "@assets/images"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { DatabaseIcon } from "@components/Icons/DatabaseImportIcon"
import { Spinner } from "@nextui-org/react"
import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import useFetchMyData from "@pages/MyData/useFetch"
import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { twMerge } from "tailwind-merge"
import { TxtIcon } from "@components/Icons/TextIcon"

const ConnectData = () => {
  const { botId } = useParams()
  const { list: myDataList, isFetched } = useFetchMyData()
  const { data } = useQuery<any>({
    queryKey: [QueryDataKeys.MY_BOT_LIST],
    refetchOnWindowFocus: false,
  })
  const agent =
    data?.data?.items?.length > 0
      ? data?.data?.items?.find((agent: any) => agent?.id?.toString() === botId)
      : null
  const isBotActive = agent && agent?.status === STATUS_AGENT.ACTIVE

  return (
    <>
      <div className="absolute top-[65%] flex -translate-y-1/2 items-center justify-center text-center">
        <span className="text-base text-mercury-800">Max file size: 50MB</span>
      </div>
      <div className="absolute top-6 h-full w-full max-w-[800px]">
        <div className="relative mx-auto mb-6 flex max-w-[484px] items-center justify-between gap-2">
          <div className="flex flex-col items-center gap-1">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#FC0] md:h-10 md:w-10">
              <FilledBrainAIIcon color="#363636" size={24} />
              <div
                className={twMerge(
                  "shadow-8 absolute -bottom-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white",
                  isBotActive && "bg-green-500",
                )}
              >
                {!isBotActive ? (
                  <Spinner
                    classNames={{
                      wrapper: "w-3 h-3",
                      circle1: "border-[#E7E0D7] border-b-brown-500",
                      circle2: "border-b-brown-500",
                    }}
                  />
                ) : (
                  <CheckFilledIcon color="white" size={12} />
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-18 font-semibold text-mercury-950">
                Creating your
              </span>
              <span className="text-18 font-semibold text-mercury-950">
                Private Agent...
              </span>
            </div>
          </div>

          <div className="absolute left-1/2 top-4 w-full max-w-[255px] -translate-x-[60%]">
            <img src={borderGdImg} />
            <div className="absolute -top-[9px] left-1/2">
              <div className="rotate-90">
                <ChevronDownIcon color="#9D936E" size={22} />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-mercury-200 md:h-10 md:w-10">
              <DatabaseIcon color="#363636" size={24} />
              <div className="absolute -bottom-1 -right-1">
                <FilledShieldCheckedIcon color="#A2845E" />
              </div>
            </div>
            <p className="max-w-[227px] text-18 font-semibold text-mercury-950">
              Connect anything you want the Private Agent to learn
            </p>
          </div>
        </div>
        <div className="mb-6 space-y-2">
          {!isBotActive ? (
            <div className="flex justify-between gap-2 rounded-lg border border-brown-500 bg-brown-50 px-4 py-3">
              <div className="flex flex-1 items-center gap-2">
                <InfoCircleIcon color="#83664B" size={16} />
                <p className="text-16 font-medium text-brown-600">
                  We appreciate your patience. Please join the whitelist to
                  activate.
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  to="https://forms.gle/qGWWAnt3nWWAkxeE9"
                  target="_blank"
                  className="whitespace-nowrap text-16 font-bold text-brown-600 hover:underline"
                >
                  Enter waitlist
                </Link>
                <Link
                  to={`${PATH_NAMES.MARKETPLACE}`}
                  className="whitespace-nowrap text-16 font-bold text-brown-600 hover:underline"
                >
                  Chat with other agents
                </Link>
              </div>
            </div>
          ) : (
            <></>
          )}

          {myDataList.length && isFetched ? (
            <div className="flex items-center gap-2 rounded-lg border border-brown-500 bg-brown-50 px-4 py-3">
              <div>
                <InfoCircleIcon color="#83664B" size={16} />
              </div>
              <div>
                <p className="text-16 font-medium text-brown-600">
                  Since no data has been added, your agent lacks personalized
                  intelligence.
                </p>
                <p className="text-16 font-medium text-brown-600">
                  Please add your data to help your agent learn more about you.
                </p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

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
              fieldkey="txtFiles"
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
    </>
  )
}
export default ConnectData
