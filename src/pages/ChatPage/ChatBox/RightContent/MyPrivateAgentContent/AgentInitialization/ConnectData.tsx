import { CheckedIcon } from "@components/Icons/Checked"
import { DatabaseIcon } from "@components/Icons/DatabaseImportIcon"
import { PDFTypeIcon } from "@components/Icons/PDFTypeIcon"
import { PhotoPlusIcon } from "@components/Icons/PhotoPlusIcon"
import { TxtIcon } from "@components/Icons/TextIcon"
import { PATH_NAMES, STATUS_AGENT } from "@constants/index"
import { useQueries } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { getMyBotData, mapMyDataToBot } from "services/user"
import { QueryDataKeys } from "types/queryDataKeys"
import { TYPE_DATA_KEY } from "../CreatePrivateAgent"
import UploadCustom from "../UploadCustom"
import UploadSocialLink from "../UploadSocialLink"
import AgentSetupStatus from "./AgentSetupStatus"
import AlertBox from "@components/AlertBox"
import { IBotData } from "types/user"

const ConnectData = () => {
  const { botId } = useParams()
  const navigate = useNavigate()

  const [myAgentDataQuery, myAgentListQuery] = useQueries<
    [
      { data: { data: { items: IBotData[] } } },
      { data: { data: { items: any[] } } },
    ]
  >({
    queries: [
      {
        queryKey: [`${QueryDataKeys.MY_BOT_DATA}-${botId}`],
        queryFn: () => getMyBotData(Number(botId), { limit: 1, offset: 0 }),
        enabled: !!botId,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: [QueryDataKeys.MY_BOT_LIST],
        refetchOnWindowFocus: false,
      },
    ],
  })

  const { data: myAgentData, isFetched: isBotDataFetched } = myAgentDataQuery

  const myDataList = myAgentData?.data?.items || []
  const agentList = myAgentListQuery?.data?.data?.items || []

  const currentAgent =
    agentList.find((agent: any) => agent?.id?.toString() === botId) || null
  const isBotActive = currentAgent?.status === STATUS_AGENT.ACTIVE

  const onMoreCustomRequest = async (data: any) => {
    try {
      const payload = {
        botId,
        data,
      }
      const res = await mapMyDataToBot(payload)
      if (res) {
        toast(
          <div className="p-4">
            <div className="flex items-center gap-2">
              <CheckedIcon size={18} /> Connect success
            </div>
            <div className="mt-2 text-16 font-medium leading-[1.2] text-mercury-900">
              {data?.length} data source(s) have been added to your data pod.
            </div>
            <div className="text-base-md mt-2 text-14 leading-[1.2] text-[#F78500]">
              Please sync your private agents with the new data.
            </div>
            <button
              onClick={() => navigate(PATH_NAMES.MY_DATA)}
              className="mt-4 flex h-[44px] w-full items-center justify-center gap-2 rounded-full bg-mercury-950 px-4 text-white"
            >
              <DatabaseIcon color="white" size={20} />
              <span className="text-[15px]">Go to My Data and Sync</span>
            </button>
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            pauseOnHover: true,
            closeOnClick: true,
          },
        )
        return "success"
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <>
      <div className="mx-auto h-auto w-full max-w-[800px] overflow-y-auto px-4 md:h-full md:px-0">
        <AgentSetupStatus isBotActive={isBotActive} />
        <div className="mb-4 space-y-2 md:mb-6">
          <AlertBox
            isVisible={!isBotActive}
            messages={[
              "We appreciate your patience. Please join the whitelist to activate.",
            ]}
            links={[
              {
                to: "https://forms.gle/qGWWAnt3nWWAkxeE9",
                label: "Enter waitlist",
                external: true,
              },
              { to: PATH_NAMES.MARKETPLACE, label: "Chat with other agents" },
            ]}
          />

          <AlertBox
            isVisible={!myDataList.length && isBotDataFetched}
            messages={[
              "Since no data has been added, your agent lacks personalized intelligence.",
              "Please add your data to help your agent learn more about you.",
            ]}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <UploadSocialLink moreCustomRequest={onMoreCustomRequest} />
            <UploadCustom
              fileKey={TYPE_DATA_KEY.CV_FILE}
              icon={<PDFTypeIcon />}
              label="CV"
              multiple
              moreCustomRequest={onMoreCustomRequest}
            />
            <UploadCustom
              fileKey={TYPE_DATA_KEY.TXT_FILE}
              icon={<TxtIcon />}
              label="Text files"
              accept=".txt,.md"
              multiple
              moreCustomRequest={onMoreCustomRequest}
            />
          </div>
          <div className="flex flex-col gap-4">
            <UploadCustom
              fileKey={TYPE_DATA_KEY.PDF_FILE}
              icon={<PDFTypeIcon />}
              label="PDFs"
              multiple
              moreCustomRequest={onMoreCustomRequest}
            />
            <UploadCustom
              fileKey={TYPE_DATA_KEY.PHOTO_VIDEO_FILE}
              icon={<PhotoPlusIcon />}
              label="Photos & Videos"
              accept="image/*,video/*"
              multiple
              moreCustomRequest={onMoreCustomRequest}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default ConnectData
