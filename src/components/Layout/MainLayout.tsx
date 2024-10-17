import useWindowSize from "@hooks/useWindowSize"
import React from "react"
import HeaderMobile from "./HeaderMobile"
import FooterMobile from "./FooterMobile"

const MainLayout: React.FC<{
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[]
}> = ({ children }) => {
  const { screenWidth } = useWindowSize()

  return (
    <div className="md:bg-mercury-30">
      {screenWidth < 768 && <HeaderMobile />}
      <div
        aria-checked={screenWidth < 768}
        className="aria-checked:pb-[60px] aria-checked:pt-[50px]"
      >
        {children}
      </div>
      {screenWidth < 768 && <FooterMobile />}
    </div>
  )
}

export default MainLayout
