import { envConfig } from "@configs/env"
import useAuthState from "@hooks/useAuthState"
import { logout } from "@reducers/user/UserSlice"
import { getAccessToken } from "@utils/storage"
import React, { createContext, useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Socket } from "socket.io-client"
import { io } from "socket.io-client"

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
  const dispatch = useDispatch()

  useEffect(() => {
    let initSocket: Socket | undefined

    if (isLogin) {
      const accessToken = getAccessToken()

      if (!accessToken) dispatch(logout())

      const createSocketConnection = () => {
        initSocket = io(envConfig.socketUrl, {
          path: "/socket.io",
          transports: ["websocket"],
          rejectUnauthorized: false,
          agent: false,
          auth: {
            authorization: `Bearer ${accessToken}`,
          },
          reconnection: true,
          reconnectionDelay: 2000,
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

        initSocket.on("reconnect", (attempt) => {
          console.log(`Reconnected after ${attempt} attempts`)
        })

        initSocket.on("reconnect_attempt", (attempt) => {
          console.log(`Attempting to reconnect: Attempt ${attempt}`)
        })
      }

      // Initial socket connection
      createSocketConnection()

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
  }, [isLogin, sessionAccessToken, dispatch])

  return (
    <SocketProviderContext.Provider value={{ socket }}>
      {children}
    </SocketProviderContext.Provider>
  )
}

export const useSocket = () => useContext(SocketProviderContext)
