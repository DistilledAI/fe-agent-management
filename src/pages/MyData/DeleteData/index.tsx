import { DeleteIcon } from "@components/Icons/Delete"
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react"
import { useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { QueryDataKeys } from "types/queryDataKeys"
import useDeleteData from "./useDelete"

const DeleteData: React.FC<{
  botId: number
  ids: number[]
}> = ({ botId, ids }) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const callbackDone = () => {
    queryClient.refetchQueries({
      queryKey: [`${QueryDataKeys.MY_BOT_DATA}-${botId}`],
    })
    setIsOpen(false)
  }

  const { onDelete, loading } = useDeleteData(callbackDone)

  return (
    <Popover
      onOpenChange={(e) => setIsOpen(e)}
      placement="bottom"
      isOpen={isOpen}
      showArrow={true}
    >
      <PopoverTrigger>
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer hover:opacity-70"
        >
          <DeleteIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <p className="text-[15px] font-medium text-mercury-800">
            Do you want to delete this?
          </p>
          <div className="mt-2 flex items-center justify-end gap-2">
            <Button
              isLoading={loading}
              onClick={() => onDelete({ botId, ids })}
              className="h-7 min-w-0 rounded-lg bg-mercury-950 font-medium text-white"
            >
              Yes
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              className="h-7 min-w-0 rounded-lg bg-mercury-100 font-medium"
            >
              No
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DeleteData
