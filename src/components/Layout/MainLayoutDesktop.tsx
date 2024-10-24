import { Outlet } from "react-router-dom"
import useInviteUser from "@hooks/useInviteUser"
import useFetchMe from "@hooks/useFetchMe"
import { StyleBoxChatProvider } from "@pages/ChatPage/ChatBox/StyleProvider"
import LeftBar from "@pages/ChatPage/ChatBox/LeftBar"
import UserAuthWrapper from "@pages/ChatPage/ChatBox/UserAuth/UserAuthWrapper"
import { useAppSelector } from "@hooks/useAppRedux"
import { twMerge } from "tailwind-merge"

const MainLayoutDesktop = () => {
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  useInviteUser()
  useFetchMe()

  return (
    <div className="bg-white font-barlow">
      <div className="flex">
        <StyleBoxChatProvider>
          <LeftBar />
          <div
            className={twMerge(
              "min-h-dvh w-[calc(100%-329px)] pt-[68px] transition-all duration-500 ease-linear",
              sidebarCollapsed && "w-[calc(100%-104px)]",
            )}
          >
            <UserAuthWrapper />
            <Outlet />
          </div>
        </StyleBoxChatProvider>
      </div>
    </div>
  )
}

export default MainLayoutDesktop
