import HeadSectionData from "../Components/HeadSectionData"
// import { EditPenFilledIcon } from "@components/Icons/Edit"
import { DeleteIcon } from "@components/Icons/Delete"
import TableData from "../Components/TableData"
import { PDFTypeIcon } from "@components/Icons/PDFTypeIcon"
import useWindowSize from "@hooks/useWindowSize"
import TableDataMobile from "../Components/TableDataMobile"
import React from "react"
import { IBotData } from "types/user"
import moment from "moment"

enum ColumnKey {
  Name = "name",
  Type = "type",
  Date = "createdAt",
  Action = "action",
}

const columns = [
  {
    key: ColumnKey.Name,
    label: "Name",
  },
  {
    key: ColumnKey.Type,
    label: "Type",
  },
  {
    key: ColumnKey.Date,
    label: "Date",
  },
  {
    key: ColumnKey.Action,
    label: "Action",
  },
]

const CvData: React.FC<{
  data: IBotData[]
}> = ({ data }) => {
  const { isMobile } = useWindowSize()

  const renderCell = (item: Record<string, any>, columnKey: string) => {
    switch (columnKey) {
      case ColumnKey.Type:
        return (
          <span className="line-clamp-1 text-base text-mercury-600">
            {item[columnKey]}
          </span>
        )
      case ColumnKey.Date:
        return (
          <span className="line-clamp-1 text-base text-mercury-600">
            {moment(item[columnKey]).format("ll")}
          </span>
        )
      case ColumnKey.Action:
        return (
          <div className="flex items-center gap-4">
            {/* <div className="cursor-pointer hover:opacity-70">
              <EditPenFilledIcon color="#545454" />
            </div> */}
            <div className="cursor-pointer hover:opacity-70">
              <DeleteIcon />
            </div>
          </div>
        )

      default:
        return (
          <span className="line-clamp-1 text-base text-mercury-950">
            {item[columnKey]}
          </span>
        )
    }
  }

  const getTdClassName = (key: string) => {
    switch (key) {
      case ColumnKey.Action:
        return "w-[100px]"
      case ColumnKey.Name:
        return "w-[200px]"
      case ColumnKey.Type:
        return "w-[200px]"
      case ColumnKey.Date:
        return "w-[150px]"

      default:
        return ""
    }
  }

  return (
    <div>
      <HeadSectionData
        iconTitle={<PDFTypeIcon color="#A2845E" size={24} />}
        title="CV"
        addTitle="Add cv"
      />
      <div className="mt-4">
        {isMobile ? (
          <TableDataMobile
            data={data.map((item) => ({
              type: item.type,
              value: item.name,
              createdAt: item.createdAt,
            }))}
          />
        ) : (
          <TableData
            tdClassName={getTdClassName}
            columns={columns}
            rows={data}
            renderCell={renderCell}
          />
        )}
      </div>
    </div>
  )
}

export default CvData
