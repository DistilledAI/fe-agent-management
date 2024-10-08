import { envConfig } from "@configs/env"
import useAuthState from "@hooks/useAuthState"
import { getAccessToken } from "@utils/storage"
import React, { createContext, useContext, useEffect, useRef } from "react"
import type { Socket } from "socket.io-client"
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
  const { isLogin } = useAuthState()
  const socketRef = useRef<Socket>()

  useEffect(() => {
    if (isLogin) {
      const accessToken = getAccessToken()

      socketRef.current = io(envConfig.socketUrl, {
        path: "/socket.io",
        transports: ["websocket"],
        rejectUnauthorized: false,
        agent: false,
        auth: {
          authorization: `Bearer ${accessToken}`,
        },
        reconnection: true,
        reconnectionAttempts: 3,
        reconnectionDelay: 2000,
      })

      socketRef.current.connect()
      socketRef.current.on("connect", () => console.log("Socket connected"))
      socketRef.current.on("error", (error) => console.error(error))

      socketRef.current.on("disconnect", (reason) => {
        console.log(`Socket disconnected: ${reason}`)
        socketRef.current?.connect()
      })

      socketRef.current.on("reconnect", (attempt) => {
        console.log(`Reconnected after ${attempt} attempts`)
      })

      socketRef.current.on("reconnect_attempt", (attempt) => {
        console.log(`Attempting to reconnect: Attempt ${attempt}`)
      })

      return () => {
        if (socketRef.current) {
          socketRef.current.off("disconnect")
          socketRef.current.off("reconnect")
          socketRef.current.off("reconnect_attempt")
          socketRef.current.disconnect()
        }
      }
    }
  }, [isLogin])

  return (
    <SocketProviderContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketProviderContext.Provider>
  )
}

export const useSocket = () => useContext(SocketProviderContext)
