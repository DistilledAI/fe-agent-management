import useWindowSize from "@hooks/useWindowSize"
import React from "react"
import FooterMobile from "./FooterMobile"
import HeaderMobile from "./HeaderMobile"
import useFetchMe from "@hooks/useFetchMe"

const MainLayout: React.FC<{
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[]
  isHeader?: boolean
  isFooter?: boolean
}> = ({ children, isHeader = true, isFooter = true }) => {
  const { screenWidth } = useWindowSize()
  useFetchMe()
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
        {children}
      </div>
      {hasFooter && <FooterMobile />}
    </div>
  )
}

export default MainLayout
