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
    <div className="w-dvw bg-white font-barlow">
      <div className="flex h-full w-full">
        <StyleBoxChatProvider>
          <LeftBar />
          <div className="col-span-1 w-full space-y-2 pt-[60px]">
            <div className="fixed right-0 top-0 z-[11] w-full bg-white px-4 pb-2 pt-4 text-end">
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
