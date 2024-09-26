import {
  bgHeaderChatboxOrai,
  chatbotOraiImg,
  oraichainLogoImgDark,
} from "@assets/images"
import { closeIconDark } from "@assets/svg"
import { MIX_PANEL_TRACK_EVENT } from "@constants/index"
import { useAppDispatch, useAppSelector } from "@hooks/useAppRedux"
import { updateChatBox } from "@reducers/chatbot/ChatBoxSlice"
import {
  defaultChatMesgData,
  updateChatMsg,
} from "@reducers/chatbot/ChatMsgSlice"
import { createChatMsg } from "@utils/chatMsg"
import { mixpanelTrack } from "@utils/defiLens"
import ChatBox from "pages/Chatbot/components/ChatBox"
import ChatInput from "pages/Chatbot/components/ChatInput"
import useChatMsg from "pages/Chatbot/hooks/useChatMsg"
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import Conversation from "./Conversation"

const Chatbot = () => {
  const methods = useForm({
    defaultValues: {
      message: "",
    },
  })
  const dispatch = useAppDispatch()
  const chatMsg = useAppSelector((state) => state.chatMsg)
  const isChatting = useAppSelector((state) => state.chatBox.isChatting)
  const sessionId = useAppSelector((state) => state.chatBox.sid)
  const { fetchChatMsg } = useChatMsg()
  const isChatBox = useAppSelector((state) => state.chatBox.isChatBox)

  const getHeaderBgColor = () => {
    return "#6A43B8"
  }

  const getChatbotImg = () => {
    return chatbotOraiImg
  }

  const getBgHeaderChatboxOrai = () => {
    return bgHeaderChatboxOrai
  }

  const handleOpenChatbox = () => {
    mixpanelTrack(MIX_PANEL_TRACK_EVENT.OPEN_WIDGET)
    const payload = sessionId
      ? {
          isChatBox: true,
        }
      : {
          isChatBox: true,
          sid: uuidv4(),
        }
    dispatch(updateChatBox(payload))
    window.parent.postMessage(
      {
        type: "isChatBox",
        message: true,
      },
      "*",
    )
  }

  const onChatMsgSubmit: SubmitHandler<FieldValues> = async (data) => {
    // if (!isAuthenticated) {
    //   return handleLogin()
    // }
    mixpanelTrack(MIX_PANEL_TRACK_EVENT.SEND_MESSAGE_WIDGET)
    const { message } = data
    if (!message || isChatting) return
    methods.setValue("message", "")

    const newChatMsg = createChatMsg(message)

    const currentChatMsg = {
      ...chatMsg,
      chat_history: chatMsg.chat_history.concat(newChatMsg.chat_history),
      message,
    }

    dispatch(updateChatMsg(currentChatMsg))

    await fetchChatMsg(currentChatMsg)
  }

  const handleClearChatData = () => {
    mixpanelTrack(MIX_PANEL_TRACK_EVENT.CLOSE_WIDGET)
    if (isChatting) return
    dispatch(updateChatMsg(defaultChatMesgData))
    dispatch(
      updateChatBox({
        isChatBox: false,
        isChatting: false,
        sid: "",
      }),
    )

    window.parent.postMessage(
      {
        type: "isChatBox",
        message: false,
      },
      "*",
    )
  }

  if (!isChatBox)
    return (
      <div
        className="group flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-t-full rounded-bl-full shadow-4 transition-all delay-300"
        // hover:w-[200px] hover:justify-start hover:pl-4 hover:duration-300"
        onClick={handleOpenChatbox}
        style={{
          background: getHeaderBgColor(),
        }}
      >
        <img
          src={getChatbotImg()}
          className=" h-19 w-12 "
          // group-hover:mr-[10px] group-hover:block"
        />
        {/* <div
          className=" h-0 w-0 flex-col overflow-hidden opacity-0 transition-all"
          // group-hover:flex group-hover:h-auto group-hover:w-auto group-hover:opacity-100 group-hover:delay-300 "
        >
          <span className=" text-14 font-600 text-neutral-title">
            Need help?
          </span>
          <span className=" text-14 font-medium text-neutral-title">
            Chat with us now!
          </span>
        </div> */}
      </div>
    )

  return (
    <div className="flex h-[480px] w-[390px] flex-col justify-between !bg-transparent shadow-4">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onChatMsgSubmit)}
          className="flex h-full flex-col items-center overflow-hidden"
        >
          <ChatBox chatBoxClassName="xlmade easy dark:bg-[#242429]">
            <div className="flex h-full flex-col justify-end">
              <div
                className=" z-40 flex h-[56px] w-full items-center justify-between rounded-t-[16px] bg-cover bg-center bg-no-repeat px-4 py-4"
                style={{
                  backgroundImage: `url(${getBgHeaderChatboxOrai()})`,
                }}
              >
                <div className="flex gap-2 items-center">
                  <img src={oraichainLogoImgDark} width={24} height={24} />
                  <div className="flex py-1 px-2.5 justify-center items-center rounded-full bg-[#9E8CFC] border border-[#856FEE]">
                    <span className="text-white text-14 font-medium">Beta version</span>
                  </div>
                </div>
                <img
                  src={closeIconDark}
                  width={24}
                  height={24}
                  onClick={handleClearChatData}
                  className=" cursor-pointer"
                />
              </div>
              <Conversation />
              <ChatInput inputWrapClassName="w-full border-t-1 border-[#373539]" />
            </div>
          </ChatBox>
        </form>
      </FormProvider>
    </div>
  )
}

export default Chatbot
