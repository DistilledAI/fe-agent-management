import HeadSectionData from "../Components/HeadSectionData"
import { EditPenFilledIcon } from "@components/Icons/Edit"
import { DeleteIcon } from "@components/Icons/Delete"
import TableData from "../Components/TableData"
import { PDFTypeIcon } from "@components/Icons/PDFTypeIcon"

const rows = [
  {
    key: "1",
    name: "byharryle.pdf",
    type: "CV",
    date: "Oct 8, 2024",
  },
  {
    key: "2",
    name: "me-profile.pdf",
    type: "Profile",
    date: "Oct 8, 2024",
  },
]

enum ColumnKey {
  Name = "name",
  Type = "type",
  Date = "date",
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

const FileData = () => {
  const renderCell = (item: Record<string, any>, columnKey: string) => {
    switch (columnKey) {
      case ColumnKey.Type:
      case ColumnKey.Date:
        return (
          <span className="text-base text-mercury-600">{item[columnKey]}</span>
        )
      case ColumnKey.Action:
        return (
          <div className="flex items-center gap-4">
            <div className="cursor-pointer hover:opacity-70">
              <EditPenFilledIcon color="#545454" />
            </div>
            <div className="cursor-pointer hover:opacity-70">
              <DeleteIcon />
            </div>
          </div>
        )

      default:
        return (
          <span className="text-base text-mercury-950">{item[columnKey]}</span>
        )
    }
  }

  const getTdClassName = (key: string) => {
    return key === ColumnKey.Action ? "w-[100px]" : ""
  }

  return (
    <div>
      <HeadSectionData
        iconTitle={<PDFTypeIcon color="#A2845E" size={24} />}
        title="PDFs"
        addTitle="Add pdf"
      />
      <div className="mt-4">
        <TableData
          tdClassName={getTdClassName}
          columns={columns}
          rows={rows}
          renderCell={renderCell}
        />
      </div>
    </div>
  )
}

export default FileData
