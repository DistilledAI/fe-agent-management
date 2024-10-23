import { Outlet } from "react-router-dom"
import useConnectWallet from "@hooks/useConnectWallet"
import useReconnectWallet from "@hooks/useReconnectWallet"
import useInviteUser from "@hooks/useInviteUser"
import useFetchMe from "@hooks/useFetchMe"
import { StyleBoxChatProvider } from "@pages/ChatPage/ChatBox/StyleProvider"
import LeftBar from "@pages/ChatPage/ChatBox/LeftBar"
import UserAuth from "@pages/ChatPage/ChatBox/UserAuth"

const MainLayoutDesktop = () => {
  const { loading, connectWallet } = useConnectWallet()
  useReconnectWallet()
  useInviteUser()
  useFetchMe()

  return (
    <div className="h-dvh w-dvw bg-white font-barlow">
      <div className="grid h-full grid-cols-[313px_1fr]">
        <StyleBoxChatProvider>
          <LeftBar />
          <div className="col-span-1 pt-6">
            <div className="sticky top-0 pr-6 text-end">
              <UserAuth connectWallet={connectWallet} loading={loading} />
            </div>
            <Outlet />
          </div>
        </StyleBoxChatProvider>
      </div>
    </div>
  )
}

export default MainLayoutDesktop
