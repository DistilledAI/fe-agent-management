import HeadSectionData from "../Components/HeadSectionData"
// import { EditPenFilledIcon } from "@components/Icons/Edit"
import { EmailUpIcon } from "@components/Icons/EmailUpIcon"
import useWindowSize from "@hooks/useWindowSize"
// import TableDataMobile from "../Components/TableDataMobile"
import moment from "moment"
import React from "react"
import { IBotData } from "types/user"
import TableData from "../Components/TableData"
// import DeleteData from "../DeleteData"

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

const EmailData: React.FC<{
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
            {/* <DeleteData botId={item.userId} ids={[item.id]} /> */}
          </div>
        )
      case ColumnKey.Name:
        return (
          <a className="hover:underline" href={item.value} target="_blank">
            <span className="line-clamp-1 text-base text-mercury-950">
              {item[columnKey]}
            </span>
          </a>
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
  const getThClassName = getTdClassName

  return (
    <div>
      <HeadSectionData
        iconTitle={<EmailUpIcon color="#A2845E" size={24} />}
        title="Emails"
        addTitle="Add email"
      />
      <div className="mt-4">
        {isMobile ? (
          <div>mobile</div>
        ) : (
          <TableData
            tdClassName={getTdClassName}
            thClassName={getThClassName}
            columns={columns}
            rows={data}
            renderCell={renderCell}
          />
        )}
      </div>
    </div>
  )
}

export default EmailData
