import { useSocket } from "providers/SocketProvider"
import { useEffect } from "react"
import { toast } from "react-toastify"
import SuccessEarn from "@components/SuccessEarn"
import "./index.css"

const EarnedPointToast = () => {
  const { socket } = useSocket()

  const convertToTitleCase = (title?: string) => {
    if (!title) return ""
    return title
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  useEffect(() => {
    if (socket) {
      const event = "xDSTL"
      socket.on(event, (e) => {
        toast(
          <SuccessEarn
            title={convertToTitleCase(e?.action)}
            point={e?.point || 0}
          />,
          {
            style: {
              overflow: "visible",
              width: "100%",
              height: "100%",
              borderRadius: 22,
            },
            className: "earned-point-toast",
          },
        )
      })

      return () => {
        socket.off(event)
      }
    }
  }, [socket])

  return null
}

export default EarnedPointToast
