import useAuthState from "@hooks/useAuthState"
import { useSocket } from "providers/SocketProvider"
import { useEffect, useState } from "react"

const useNewMsg = () => {
  const { socket } = useSocket()
  const { user } = useAuthState()
  const [isNewMsg, setIsNewMsg] = useState<boolean>(false)

  useEffect(() => {
    if (socket && user) {
      const event = "chat-group"
      socket.on(event, (e) => {
        if (e?.user?.id === user?.id) return
        setIsNewMsg(true)
      })

      return () => {
        socket.off(event)
        setIsNewMsg(false)
      }
    }
  }, [socket, user])

  return { isNewMsg, setIsNewMsg }
}

export default useNewMsg
