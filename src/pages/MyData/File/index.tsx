import HeadSectionData from "../Components/HeadSectionData"
// import { EditPenFilledIcon } from "@components/Icons/Edit"
import { InfoCircleIcon } from "@components/Icons/InfoCircleIcon"
import { PDFTypeIcon } from "@components/Icons/PDFTypeIcon"
import useWindowSize from "@hooks/useWindowSize"
import { BotDataTypeKey } from "@types"
import moment from "moment"
import React from "react"
import TableData from "../Components/TableData"
import TableDataMobile from "../Components/TableDataMobile"
import DeleteData from "../DeleteData"
import SyncData, { MY_DATA_STATUS, SyncLabel } from "../SyncData"
import useFetchByCategory from "../useFetchByCategory"
import { useQuery } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"
import { STATUS_AGENT } from "@constants/index"

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

const FileData: React.FC<{
  botId: number
  category: BotDataTypeKey
}> = ({ botId, category }) => {
  const { isMobile } = useWindowSize()
  const {
    list: data,
    hasNextPage,
    fetchNextPage,
  } = useFetchByCategory(category, botId)

  const hasSyncData = Boolean(
    data.find(
      (item) =>
        item.status === MY_DATA_STATUS.ACTIVE ||
        item.status === MY_DATA_STATUS.SUSPENDED,
    ),
  )

  const { data: dtAgent }: { data: any } = useQuery({
    queryKey: [QueryDataKeys.MY_BOT_LIST],
    refetchOnWindowFocus: false,
  })
  const isBotActive = dtAgent?.data?.items?.[0]?.status === STATUS_AGENT.ACTIVE

  const hasSyncDataByStatus = (status: MY_DATA_STATUS) => {
    return (
      status === MY_DATA_STATUS.ACTIVE || status === MY_DATA_STATUS.SUSPENDED
    )
  }

  const renderCell = (item: Record<string, any>, columnKey: string) => {
    const dataId = item?.id

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
          <div className="flex items-center justify-end gap-4">
            {isBotActive ? (
              <>
                <SyncData botId={botId} dataId={dataId} status={item.status} />
                <DeleteData
                  botId={item.userId}
                  ids={[item.id]}
                  category={category}
                />
              </>
            ) : (
              <div className="text-orange-500">Processing...</div>
            )}
          </div>
        )
      case ColumnKey.Name:
        return (
          <div className="flex flex-row items-center gap-1">
            {hasSyncDataByStatus(item.status) && <InfoCircleIcon />}
            <a
              className="max-w-[150px] truncate hover:underline"
              href={item.value}
              target="_blank"
            >
              <span className="text-base text-mercury-950">
                {item[columnKey]}
              </span>
            </a>
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
        return "w-[140px] text-right"
      case ColumnKey.Name:
        return "w-[200px]"
      case ColumnKey.Type:
        return "w-[180px]"
      case ColumnKey.Date:
        return "w-[180px]"

      default:
        return ""
    }
  }
  const getThClassName = getTdClassName

  return (
    <div>
      <div className="flex justify-between max-sm:flex-col max-sm:justify-start">
        <HeadSectionData
          iconTitle={<PDFTypeIcon color="#A2845E" size={24} />}
          title="PDFs"
          addTitle="Add pdf"
        />
        {hasSyncData && <SyncLabel />}
      </div>

      <div className="mt-4">
        {isMobile ? (
          <TableDataMobile
            data={data.map((item) => ({
              type: item.type,
              value: item.name,
              createdAt: item.createdAt,
              id: item.id,
            }))}
            loadMore={fetchNextPage}
            hasMore={hasNextPage}
            category={category}
            botId={botId}
          />
        ) : (
          <TableData
            tdClassName={getTdClassName}
            thClassName={getThClassName}
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

export default FileData
