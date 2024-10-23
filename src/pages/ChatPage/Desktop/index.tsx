import { StyleBoxChatProvider } from "../ChatBox/StyleProvider"
import LeftBar from "../ChatBox/LeftBar"
import UserAuth from "../ChatBox/UserAuth"
import { Outlet } from "react-router-dom"
import useConnectWallet from "@hooks/useConnectWallet"
import useReconnectWallet from "@hooks/useReconnectWallet"

const ChatPageDesktop = () => {
  const { loading, connectWallet } = useConnectWallet()
  useReconnectWallet()

  return (
    <div className="h-dvh w-dvw bg-white p-6 font-barlow">
      <div className="grid h-full grid-cols-[313px_1fr]">
        <StyleBoxChatProvider>
          <LeftBar />
          <div className="col-span-1">
            <div className="text-end">
              <UserAuth connectWallet={connectWallet} loading={loading} />
            </div>
            <Outlet />
          </div>
        </StyleBoxChatProvider>
      </div>
    </div>
  )
}

export default ChatPageDesktop
