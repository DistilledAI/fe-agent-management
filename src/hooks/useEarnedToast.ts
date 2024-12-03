import { useSocket } from "providers/SocketProvider"
import { useEffect } from "react"

const useEarnedToast = () => {
  const { socket } = useSocket()

  useEffect(() => {
    if (socket) {
      const event = "xDSTL"
      socket.on(event, (e) => {
        console.log("XDSTLLL", e)
      })

      return () => {
        socket.off(event)
      }
    }
  }, [socket])
}

export default useEarnedToast
