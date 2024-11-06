import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import { Button } from "@nextui-org/react"
import useGetChatId from "@pages/ChatPage/Mobile/ChatDetail/useGetChatId"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { changeStatusBotInGroup, checkStatusBotInGroup } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"

const BOT_STATUS = {
  ENABLE: 1,
  DISABLE: 0,
}

const DelegatePrivateAgent: React.FC = () => {
  const { privateChatId } = useParams()
  const { chatId } = useGetChatId()
  //   const [isShowNotification, setShowNotification] = useState<boolean>(false)
  const groupId = chatId || privateChatId

  const callCheckStatusBotInGroup = async () => {
    const response = await checkStatusBotInGroup(groupId)
    if (response?.data) {
      return response?.data
    }
  }

  const { data: botInfo, refetch } = useQuery({
    queryKey: [QueryDataKeys.DELEGATE_PRIVATE_AGENT, groupId],
    queryFn: callCheckStatusBotInGroup,
    enabled: !!groupId,
    refetchOnMount: false,
    retry: false,
    staleTime: 60 * 60 * 1000,
  })

  const botStatus = botInfo?.status
  const myBotData = botInfo?.myBot
  const botId = myBotData?.id
  const isBotEnabled = botStatus === BOT_STATUS.ENABLE

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setShowNotification(false)
  //     }, 5000)
  //   }, [isShowNotification])

  const handleSetDelegate = async () => {
    const status = isBotEnabled ? BOT_STATUS.DISABLE : BOT_STATUS.ENABLE
    try {
      const payloadData = {
        groupId,
        botId,
        status,
      }
      const response = await changeStatusBotInGroup(payloadData)
      if (response) {
        refetch()
        // setShowNotification(true)
      }
    } catch (error) {
      console.error("error", error)
    }
  }

  //   const renderNotification = () => {
  //     if (isShowNotification && !isBotEnabled)
  //       return (
  //         <div className="mb-5 flex justify-center">
  //           <span className="text-mercury-500 text-base">
  //             You now delegate chat to your agent
  //           </span>
  //         </div>
  //       )

  //     return <div />
  //   }

  if (!myBotData) return <></>

  return (
    <>
      {/* {renderNotification()} */}
      <div className="hidden w-fit items-center justify-end md:flex">
        <Button
          className="flex h-11 w-fit cursor-pointer items-center gap-2 rounded-3xl bg-mercury-70 p-3"
          onClick={handleSetDelegate}
        >
          {isBotEnabled ? (
            <FilledBrainAIIcon size={20} />
          ) : (
            <FilledUserIcon size={20} />
          )}
          <span className="text-base text-mercury-900 transition-all duration-500 ease-in-out">
            {isBotEnabled
              ? " Take over this chat by yourself"
              : " Delegate to your Private Agent"}
          </span>
        </Button>
      </div>
      <div className="block md:hidden">
        <Button
          onClick={handleSetDelegate}
          className="flex h-11 items-center rounded-full bg-mercury-950"
        >
          {isBotEnabled ? (
            <>
              <span className="text-13 font-medium text-white">Delegate</span>
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0FE9A4]">
                <FilledUserIcon size={12} />
              </div>
              <div className="rotate-180">
                <ArrowLeftFilledIcon color="white" size={12} />
              </div>
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FC0]">
                <FilledBrainAIIcon size={12} />
              </div>
            </>
          ) : (
            <>
              <span className="text-13 font-medium text-white">Take over</span>
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FC0]">
                <FilledBrainAIIcon size={12} />
              </div>
              <div className="rotate-180">
                <ArrowLeftFilledIcon color="white" size={12} />
              </div>
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0FE9A4]">
                <FilledUserIcon size={12} />
              </div>
            </>
          )}
        </Button>
      </div>
    </>
  )
}
export default DelegatePrivateAgent
