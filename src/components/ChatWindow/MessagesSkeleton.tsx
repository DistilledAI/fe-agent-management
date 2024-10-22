import { Skeleton } from "@nextui-org/react"
import { divide } from "lodash"
import React from "react"

const MessagesSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-9 w-9 rounded-full" />
    </div>
  )
}

export default MessagesSkeleton
