import useAuthState from "@hooks/useAuthState"
import { useSocket } from "providers/SocketProvider"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const useGroupSocket = (
  setHasNotiList: React.Dispatch<React.SetStateAction<Array<number>>>,
) => {
  const { socket } = useSocket()
  const { user } = useAuthState()
  const { chatId } = useParams()

  useEffect(() => {
    if (socket && user) {
      const event = "chat-group"
      socket.on(event, (e) => {
        if (e?.user?.id === user?.id || Number(chatId) === e.group) return
        setHasNotiList((prev) =>
          prev.includes(e.group) ? [...prev] : [...prev, e.group],
        )
      })

      return () => {
        socket.off(event)
      }
    }
  }, [socket, user, chatId, setHasNotiList])
}

export default useGroupSocket
