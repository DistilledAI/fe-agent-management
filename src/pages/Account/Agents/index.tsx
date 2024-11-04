import AvatarCustom from "@components/AvatarCustom"
import { SettingIcon } from "@components/Icons"
import { CopyIcon } from "@components/Icons/Copy"
import { ShareWithQrIcon } from "@components/Icons/Share"
import TableData from "@pages/MyData/Components/TableData"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import React, { useState } from "react"
import { IAgentData } from "types/user"
import ShareModal from "../Profile/ShareProfile/ShareModal"
import { PATH_NAMES, STATUS_AGENT } from "@constants/index"
import { useDisclosure } from "@nextui-org/react"
import { twMerge } from "tailwind-merge"

enum ColumnKey {
  Agent = "agent",
  Address = "address",
  Status = "status",
  Action = "action",
}

const columns = [
  {
    key: ColumnKey.Agent,
    label: "My Agents",
  },
  {
    key: ColumnKey.Address,
    label: "Address",
  },
  {
    key: ColumnKey.Status,
    label: "Status",
  },
  {
    key: ColumnKey.Action,
    label: "",
  },
]

const appUrl = window.location.origin

const Agents: React.FC<{
  agents: IAgentData[]
}> = ({ agents }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [agentSelected, setAgentSelected] = useState<number | null>(null)
  const isPending = (status: number) => status === STATUS_AGENT.PENDING

  const MAP_LABEL_FROM_STATUS = {
    [STATUS_AGENT.PENDING]: "Awaiting creation",
  }

  const renderCell = (item: Record<string, any>, columnKey: string) => {
    switch (columnKey) {
      case ColumnKey.Agent:
        return (
          <div className="flex gap-3">
            <div>
              <AvatarCustom
                publicAddress={item.publicAddress || item.username}
                className="h-6 w-6"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="line-clamp-1 font-bold text-mercury-950">
                  {item.username}
                </p>
                <div
                  onClick={() => {
                    if (isPending(item.status)) return
                    onOpen()
                    setAgentSelected(item.id)
                  }}
                  className={twMerge(
                    "cursor-pointer",
                    isPending(item.status) ? "cursor-default opacity-70" : "",
                  )}
                >
                  <ShareWithQrIcon />
                </div>
              </div>
              <p className="line-clamp-1 text-13 text-mercury-600">
                {item.description}
              </p>
            </div>
          </div>
        )

      case ColumnKey.Action:
        return (
          <div className="inline-flex cursor-pointer items-center gap-1 font-medium text-[#A2845E] hover:opacity-70">
            <SettingIcon /> Edit
          </div>
        )

      case ColumnKey.Status:
        return (
          <div className="text-[#FF9500]">
            {MAP_LABEL_FROM_STATUS[item.status]}
          </div>
        )

      case ColumnKey.Address:
        return item.publicAddress ? (
          <div
            onClick={(e) => copyClipboard(e, item.publicAddress)}
            className="inline-flex cursor-pointer items-center gap-1 hover:opacity-70"
          >
            <span className="text-16 font-medium text-mercury-900">
              {centerTextEllipsis(item.publicAddress, 5)}
            </span>
            <CopyIcon />
          </div>
        ) : (
          "- - -"
        )

      default:
        return (
          <span className="line-clamp-1 text-base text-mercury-950">
            {item[columnKey]}
          </span>
        )
    }
  }

  const getThClassName = (key: string) => {
    switch (key) {
      case ColumnKey.Agent:
        return "font-semibold text-mercury-950"
      case ColumnKey.Action:
        return "w-[100px]"

      default:
        return ""
    }
  }

  const getTdClassName = (key: string) => {
    switch (key) {
      case ColumnKey.Action:
        return "align-top text-right"

      default:
        return "align-top"
    }
  }

  return (
    <>
      <TableData
        thClassName={getThClassName}
        tdClassName={getTdClassName}
        columns={columns}
        rows={agents}
        renderCell={renderCell}
        baseClassName="max-h-[400px]"
      />
      <ShareModal
        shareUrl={`${appUrl}${PATH_NAMES.INVITE}/${agentSelected}`}
        isOpen={isOpen && !!agentSelected}
        onClose={() => {
          onClose()
          setAgentSelected(null)
        }}
      />
    </>
  )
}

export default Agents
