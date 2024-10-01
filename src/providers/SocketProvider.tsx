"use client"

import { envConfig } from "@configs/env"
import useAuthState from "@hooks/useAuthState"
import cachedLocalStorage, { storageKey } from "@utils/storage"
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
      socketRef.current = io(envConfig.socketUrl, {
        path: "/socket.io",
        transports: ["websocket"],
        rejectUnauthorized: false,
        agent: false,
        auth: {
          authorization: `Bearer ${cachedLocalStorage.getWithExpiry(storageKey.ACCESS_TOKEN)}`,
        },
      })
      socketRef.current.connect()
      socketRef.current.on("connect", () => console.log("Socket connected"))
      socketRef.current.on("error", (error) => console.error(error))

      return () => {
        if (socketRef.current) socketRef.current.disconnect()
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
