import { PATH_NAMES } from "@constants/index"
import useFetchMe from "@hooks/useFetchMe"
import useInviteAgent from "@hooks/useInviteAgent"
import useReconnectWallet from "@hooks/useReconnectWallet"
import useWindowSize from "@hooks/useWindowSize"
import useMessageSocket from "@pages/ChatPage/ChatBox/useMessageSocket"
import useGetChatId from "@pages/ChatPage/Mobile/ChatDetail/useGetChatId"
import { Outlet, useLocation, useParams } from "react-router-dom"
import FooterMobile from "./FooterMobile"
import HeaderMobile from "./HeaderMobile"

const MainLayout = () => {
  useInviteAgent()
  useFetchMe()
  useReconnectWallet()
  useMessageSocket()

  const { screenWidth } = useWindowSize()
  const { pathname } = useLocation()
  const { inviteAgentId, privateChatId } = useParams()
  const { chatId } = useGetChatId()
  const ignoreLayout = [
    `${PATH_NAMES.CHAT}/${chatId}`,
    `${PATH_NAMES.INVITE}/${inviteAgentId}`,
    `${PATH_NAMES.MY_DATA}`,
    `${PATH_NAMES.PRIVATE_AGENT}/${privateChatId}`,
    `${PATH_NAMES.CHAT_LIVE_DETAIL}/${chatId}`,
  ]

  const isIgnoreLayout = ignoreLayout.includes(pathname)
  const isHeader = !isIgnoreLayout
  const isFooter = !isIgnoreLayout

  const hasHeader = screenWidth < 768 && isHeader
  const hasFooter = screenWidth < 768 && isFooter

  return (
    <div className="max-md:bg-mercury-30">
      {hasHeader && <HeaderMobile />}
      <div
        aria-checked={hasHeader}
        aria-current={hasFooter}
        className="aria-current:pb-[60px] aria-checked:pt-[50px]"
      >
        <Outlet />
      </div>
      {hasFooter && <FooterMobile />}
    </div>
  )
}

export default MainLayout
