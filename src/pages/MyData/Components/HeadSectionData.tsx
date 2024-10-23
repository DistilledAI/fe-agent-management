import { PlusIcon } from "@components/Icons/Plus"
import React from "react"

const HeadSectionData: React.FC<{
  iconTitle: React.ReactNode
  title: string
  addTitle: string
}> = ({ iconTitle, title, addTitle }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="inline-flex items-center gap-2">
        {iconTitle}
        <span className="text-base font-semibold text-mercury-900 max-sm:text-15">
          {title}
        </span>
      </div>
      <div className="inline-flex cursor-pointer items-center gap-1 hover:opacity-70">
        <PlusIcon />
        <span className="text-base font-medium text-brown-10 max-sm:text-15">
          {addTitle}
        </span>
      </div>
    </div>
  )
}

export default HeadSectionData
