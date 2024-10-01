"use client"

import { envConfig } from "@configs/env"
import useAuthState from "@hooks/useAuthState"
import cachedLocalStorage, { storageKey } from "@utils/storage"
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { Socket } from "socket.io-client"
import { io } from "socket.io-client"

type SocketProviderProps = {
  children: React.ReactNode
}

export interface SocketState {
  socket: Socket | undefined
  setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>
}

export const initialState: SocketState = {
  socket: undefined,
  setSocket: () => {},
}

const SocketProviderContext = createContext(initialState)

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>()
  const { isLogin } = useAuthState()

  useEffect(() => {
    if (isLogin && !socket?.connected) {
      const socket = io(envConfig.socketUrl, {
        path: "/socket.io",
        transports: ["websocket"],
        rejectUnauthorized: false,
        agent: false,
        auth: {
          authorization: `Bearer ${cachedLocalStorage.getWithExpiry(storageKey.ACCESS_TOKEN)}`,
        },
      })
      socket.connect()
      socket.on("connect", () => {
        setSocket(socket)
      })

      socket.on("error", (error) => {
        console.error(error)
      })
    } else if (socket?.connected) {
      socket.disconnect()
      setSocket(undefined)
    }
  }, [isLogin])

  const contextValue: SocketState = useMemo(() => {
    return {
      socket,
      setSocket,
    }
  }, [socket, setSocket])

  return (
    <SocketProviderContext.Provider value={contextValue}>
      {children}
    </SocketProviderContext.Provider>
  )
}

export const useSocket = () => useContext(SocketProviderContext)
