import useAuthState from "@hooks/useAuthState"
import useReconnectWallet from "@hooks/useReconnectWallet"
import { useParams } from "react-router-dom"
import useMessageSocket from "../ChatBox/useMessageSocket"
import ChatDetail from "./ChatDetail"
import ChatList from "./ChatList"
import ChatSearch from "./ChatSearch"

const ChatPageMobile = () => {
  const { chatId } = useParams()
  const { isLogin } = useAuthState()
  useReconnectWallet()
  useMessageSocket()

  return isLogin && chatId ? (
    <ChatDetail />
  ) : (
    <div className="min-h-[calc(100dvh-110px)] bg-mercury-30 font-barlow">
      <div className="fixed left-0 top-[50px] w-full bg-[rgba(255,255,255,0.85)] px-4 py-1 backdrop-blur-[10px]">
        <ChatSearch />
      </div>
      <div className="h-[calc(100vh-110px)] w-full bg-[rgba(255,255,255,0.85)] pt-[56px]">
        <ChatList />
      </div>
    </div>
  )
}

export default ChatPageMobile
