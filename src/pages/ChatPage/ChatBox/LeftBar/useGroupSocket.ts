import useAuthState from "@hooks/useAuthState"
import { useSocket } from "providers/SocketProvider"
import { useEffect } from "react"

const useGroupSocket = (
  setHasNotiList: React.Dispatch<React.SetStateAction<Array<number>>>,
) => {
  const { socket } = useSocket()
  const { user } = useAuthState()

  useEffect(() => {
    if (socket && user) {
      const event = "chat-group"
      socket.on(event, (e) => {
        if (e?.user?.id === user?.id) return
        setHasNotiList((prev) =>
          prev.includes(e.group) ? [...prev] : [...prev, e.group],
        )
      })

      return () => {
        socket.off(event)
      }
    }
  }, [socket, user])
}

export default useGroupSocket
