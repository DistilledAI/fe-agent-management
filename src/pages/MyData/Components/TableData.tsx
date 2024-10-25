import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll"
import { twMerge } from "tailwind-merge"

type Column = {
  key: string
  label: string
}

const TableData: React.FC<{
  columns: Column[]
  rows: Record<string, any>[]
  renderCell: (item: Record<string, any>, columnKey: string) => React.ReactNode
  thClassName?: (columnKey: string) => string
  tdClassName?: (columnKey: string) => string
  loadMore?: {
    onLoadMore: () => void
    hasMore: boolean
  }
  baseClassName?: string
}> = ({
  columns,
  rows,
  renderCell,
  thClassName,
  tdClassName,
  loadMore,
  baseClassName,
}) => {
  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore: loadMore?.hasMore,
    onLoadMore: loadMore?.onLoadMore,
  })

  return (
    <Table
      // isHeaderSticky
      aria-label="table"
      classNames={{
        wrapper:
          "shadow-none bg-mercury-30 border-1 border-white rounded-[22px] px-6 gap-0",
        th: "bg-transparent h-5 p-0 pb-1 pr-4 text-base font-normal text-mercury-600",
        td: "pl-0 pr-4 py-2",
        thead: "border-b-1 border-mercury-100",
        tbody: "[&>tr:first-child>td]:pt-4",
        emptyWrapper: "h-10",
        base: twMerge("overflow-scroll", !!baseClassName && baseClassName),
      }}
      bottomContent={<span ref={loaderRef} className="h-0 w-full" />}
      baseRef={scrollerRef}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            className={thClassName ? thClassName(column.key) : ""}
            key={column.key}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={rows}
        emptyContent={<span className="text-base text-mercury-600">Empty</span>}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell
                className={tdClassName ? tdClassName(columnKey as string) : ""}
              >
                {renderCell(item, columnKey as string)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TableData
