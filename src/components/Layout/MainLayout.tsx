import useWindowSize from "@hooks/useWindowSize"
import FooterMobile from "./FooterMobile"
import HeaderMobile from "./HeaderMobile"
import { Outlet, useLocation, useParams } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"
import useInviteUser from "@hooks/useInviteUser"
import useFetchMe from "@hooks/useFetchMe"

const MainLayout = () => {
  useInviteUser()
  useFetchMe()

  const { screenWidth } = useWindowSize()
  const { pathname } = useLocation()
  const { chatId } = useParams()

  const hasLayout = pathname !== `${PATH_NAMES.CHAT}/${chatId}`
  const isHeader = hasLayout
  const isFooter = hasLayout

  const hasHeader = screenWidth < 768 && isHeader
  const hasFooter = screenWidth < 768 && isFooter

  return (
    <div className="max-sm:bg-mercury-30">
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
