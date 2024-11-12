import { useQueryClient } from "@tanstack/react-query"
import { useSocket } from "providers/SocketProvider"
import { useEffect } from "react"
import { QueryDataKeys } from "types/queryDataKeys"

const useUpdateStatus = ({
  botId,
  category,
}: {
  botId: number
  category: string
}) => {
  const { socket } = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (socket) {
      const event = "updateTrainStatus"
      socket.on(event, (e) => {
        if (e?.event === "notification" && e?.data) {
          queryClient.setQueryData(
            [`${QueryDataKeys.MY_BOT_DATA}-${botId}-${category}`],
            (oldData: any) => {
              const dt = oldData?.pages?.flat()?.map((item: any) => {
                if (item.id === e.data.id) {
                  return { ...item, status: e.data.status }
                }
                return item
              })
              return {
                pageParams: [1],
                pages: dt,
              }
            },
          )
        }
      })

      return () => {
        socket.off(event)
      }
    }
  }, [socket, botId, category])
}

export default useUpdateStatus
