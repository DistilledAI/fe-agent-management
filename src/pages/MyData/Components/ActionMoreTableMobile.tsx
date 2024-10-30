import { DotFilledIcon } from "@components/Icons/DotIcon"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import { BotDataTypeKey } from "@types"
import React, { useState } from "react"
import DeleteData from "../DeleteData"
import { ITableData } from "./TableDataMobile"

const ActionMoreTableMobile: React.FC<{
  botId: number
  category: BotDataTypeKey
  data: ITableData
}> = ({ botId, category, data }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dropdown isOpen={isOpen} onOpenChange={(e) => setIsOpen(e)}>
      <DropdownTrigger>
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer hover:opacity-70"
        >
          <DotFilledIcon size={20} />
        </div>
      </DropdownTrigger>
      <DropdownMenu closeOnSelect={false} aria-label="Static Actions">
        <DropdownItem key="delete">
          <DeleteData
            botId={botId}
            ids={[data.id]}
            category={category}
            trigger="Delete"
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default ActionMoreTableMobile
