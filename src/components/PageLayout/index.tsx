import React from "react"

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100dvh] w-[100dvw]">
      <main>{children}</main>
    </div>
  )
}

export default PageLayout
