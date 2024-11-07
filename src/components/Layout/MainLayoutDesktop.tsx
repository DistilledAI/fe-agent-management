import { useAppSelector } from "@hooks/useAppRedux"
import useFetchMe from "@hooks/useFetchMe"
import useInviteAgent from "@hooks/useInviteAgent"
import LeftBar from "@pages/ChatPage/ChatBox/LeftBar"
import useMessageSocket from "@pages/ChatPage/ChatBox/useMessageSocket"
import UserAuthWrapper from "@pages/ChatPage/ChatBox/UserAuth/UserAuthWrapper"
import { StyleSpacingProvider } from "providers/StyleSpacingProvider"
import { Outlet } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const MainLayoutDesktop = () => {
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  useInviteAgent()
  useFetchMe()
  useMessageSocket()

  return (
    <StyleSpacingProvider>
      <div className="bg-white font-barlow">
        <div className="flex">
          <LeftBar />
          <div
            className={twMerge(
              "relative min-h-dvh w-[calc(100%-329px)] pt-[68px] transition-all duration-300 ease-in-out",
              sidebarCollapsed && "w-[calc(100%-104px)]",
            )}
          >
            <UserAuthWrapper />
            <Outlet />
          </div>
        </div>
      </div>
    </StyleSpacingProvider>
  )
}

export default MainLayoutDesktop
