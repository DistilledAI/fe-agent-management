import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import { isHasNotification } from "./LeftBar/helpers"

interface Props {
  groupId: number
}

const DotNotification = ({ groupId }: Props) => {
  const { chatId } = useParams()
  const { data: groupsHaveNotification = [] } = useQuery<number[]>({
    queryKey: [QueryDataKeys.NOTIFICATION_GROUPS],
  })

  return (
    <div
      className={twMerge(
        "absolute left-[10px] top-[10px] hidden h-2 w-2 rounded-full bg-red-600",
        isHasNotification(groupsHaveNotification, groupId, Number(chatId)) &&
          "block",
      )}
    />
  )
}

export default DotNotification
