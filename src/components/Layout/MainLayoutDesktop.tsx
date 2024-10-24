import useFetchMe from "@hooks/useFetchMe"
import useInviteUser from "@hooks/useInviteUser"
import LeftBar from "@pages/ChatPage/ChatBox/LeftBar"
import { StyleBoxChatProvider } from "@pages/ChatPage/ChatBox/StyleProvider"
import UserAuthWrapper from "@pages/ChatPage/ChatBox/UserAuth/UserAuthWrapper"
import { Outlet } from "react-router-dom"

const MainLayoutDesktop = () => {
  useInviteUser()
  useFetchMe()

  return (
    <div className="bg-white font-barlow">
      <div className="flex">
        <StyleBoxChatProvider>
          <LeftBar />
          <div className="min-h-dvh w-full flex-1 pt-[68px]">
            <UserAuthWrapper />
            <Outlet />
          </div>
        </StyleBoxChatProvider>
      </div>
    </div>
  )
}

export default MainLayoutDesktop
