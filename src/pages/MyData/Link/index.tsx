import HeadSectionData from "../Components/HeadSectionData"
import { SocialLinkIcon } from "@components/Icons/SocialLinkIcon"
// import { EditPenFilledIcon } from "@components/Icons/Edit"
import TableData from "../Components/TableData"
import useWindowSize from "@hooks/useWindowSize"
import TableDataMobile from "../Components/TableDataMobile"
import React from "react"
import moment from "moment"
import DeleteData from "../DeleteData"
import useFetchByCategory from "../useFetchByCategory"
import { BotDataTypeKey } from "@types"

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

const LinkData: React.FC<{
  botId: number
  category: BotDataTypeKey
}> = ({ botId, category }) => {
  const { isMobile } = useWindowSize()
  const {
    list: data,
    hasNextPage,
    fetchNextPage,
  } = useFetchByCategory(category, botId)

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
            <DeleteData
              botId={item.userId}
              ids={[item.id]}
              category={category}
            />
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
        iconTitle={<SocialLinkIcon color="#A2845E" size={24} />}
        title="Website Links/Social media"
        addTitle="Add link"
      />
      <div className="mt-4">
        {isMobile ? (
          <TableDataMobile
            data={data.map((item) => ({
              type: item.type,
              value: item.name,
              createdAt: item.createdAt,
            }))}
            loadMore={fetchNextPage}
            hasMore={hasNextPage}
          />
        ) : (
          <TableData
            tdClassName={getTdClassName}
            columns={columns}
            rows={data}
            renderCell={renderCell}
            loadMore={{ onLoadMore: fetchNextPage, hasMore: hasNextPage }}
            baseClassName="max-h-[400px]"
          />
        )}
      </div>
    </div>
  )
}

export default LinkData
