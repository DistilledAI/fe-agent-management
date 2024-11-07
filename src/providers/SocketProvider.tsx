import { envConfig } from "@configs/env"
import useAuthAction from "@hooks/useAuthAction"
import useAuthState from "@hooks/useAuthState"
import { getAccessToken } from "@utils/storage"
import React, { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { io, Socket } from "socket.io-client"

type SocketProviderProps = {
  children: React.ReactNode
}

export interface SocketState {
  socket: Socket | undefined
}

export const initialState: SocketState = {
  socket: undefined,
}

const SocketProviderContext = createContext(initialState)

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { isLogin, sessionAccessToken } = useAuthState()
  const [socket, setSocket] = useState<Socket>()
  const { logout } = useAuthAction()

  useEffect(() => {
    let initSocket: Socket | undefined
    const accessToken = getAccessToken()
    if (isLogin && accessToken) {
      const createSocketConnection = () => {
        initSocket = io(envConfig.socketUrl, {
          path: "/socket.io",
          transports: ["websocket"],
          rejectUnauthorized: false,
          agent: false,
          auth: {
            authorization: `Bearer ${getAccessToken()}`,
          },
          reconnection: true,
          reconnectionDelay: 2000,
          reconnectionAttempts: 3,
          autoConnect: true,
        })

        initSocket.connect()

        initSocket.on("connect", () => {
          setSocket(initSocket)
          console.log("Socket connected")
        })

        initSocket.on("error", (error) => console.error(error))

        initSocket.on("disconnect", (reason) => {
          console.log(`Socket disconnected: ${reason}`)

          if (reason !== "io client disconnect") {
            initSocket?.connect()
          }
        })

        initSocket.on("distill-error", (reason) => {
          console.log(`Socket error distill: ${reason}`)
          initSocket = undefined
          const accessToken = getAccessToken()
          // if (reason?.status === 401 && accessToken) createSocketConnection()
          if (reason?.status === 401 && !accessToken) {
            toast.info("Login session has expired!")
            logout()
          }
        })

        initSocket.on("reconnect", (attempt) => {
          console.log(`Reconnected after ${attempt} attempts`)
        })

        initSocket.on("reconnect_attempt", (attempt) => {
          console.log(`Attempting to reconnect: Attempt ${attempt}`)
        })
      }

      // Initial socket connection
      if (!initSocket) {
        createSocketConnection()
      }

      // Reconnect on network recovery
      const handleOnline = () => {
        if (initSocket?.connected) return
        initSocket?.disconnect()
        initSocket?.connect()
      }
      window.addEventListener("online", handleOnline)

      // Reconnect when tab/window gains focus
      const handleFocus = () => {
        if (initSocket?.connected) return
        initSocket?.disconnect()
        initSocket?.connect()
      }
      window.addEventListener("focus", handleFocus)

      // Reconnect after system wakes up from sleep
      const handleWakeUp = () => {
        if (initSocket?.connected) return
        initSocket?.disconnect()
        initSocket?.connect()
      }
      window.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          handleFocus()
        }
      })
      window.addEventListener("resume", handleWakeUp)

      return () => {
        // Cleanup event listeners
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("focus", handleFocus)
        window.removeEventListener("visibilitychange", handleFocus)
        window.removeEventListener("resume", handleWakeUp)

        if (initSocket?.connected) {
          initSocket.disconnect()
        }
      }
    }
  }, [isLogin, sessionAccessToken])

  return (
    <SocketProviderContext.Provider value={{ socket }}>
      {children}
    </SocketProviderContext.Provider>
  )
}

export const useSocket = () => useContext(SocketProviderContext)
