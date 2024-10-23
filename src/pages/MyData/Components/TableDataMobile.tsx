import { DotFilledIcon } from "@components/Icons/DotIcon"
import React from "react"

interface ITableData {
  type?: string
  value: string
  createdAt: string
}

const TableDataMobile: React.FC<{
  data: ITableData[]
}> = ({ data }) => {
  const isEmpty = data.length === 0

  return (
    <div className="rounded-[22px] border-1 border-white bg-mercury-30 p-4">
      {isEmpty ? (
        <span className="text-14 text-base text-mercury-600">Empty</span>
      ) : (
        data.map((item) => (
          <div
            key={item.value}
            className="flex items-center justify-between border-b-1 border-mercury-100 py-2 first:pt-0 last:border-none last:pb-0"
          >
            <div className="flex max-w-[calc(100%-50px)] flex-col gap-1">
              {item.type && (
                <p className="m-0 text-base text-mercury-600">{item.type}</p>
              )}
              <p className="m-0 line-clamp-1 text-14 text-base text-mercury-950">
                {item.value}
              </p>
              <p className="m-0 text-14 text-base text-mercury-600">
                {item.createdAt}
              </p>
            </div>
            <div className="flex w-[50px] justify-end">
              <div className="cursor-pointer hover:opacity-70">
                <DotFilledIcon size={20} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default TableDataMobile
