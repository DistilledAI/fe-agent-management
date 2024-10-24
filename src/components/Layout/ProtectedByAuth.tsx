import Login from "@components/Login"
import { RoleUser } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import React from "react"

const ProtectedByAuth: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { isLogin, user } = useAuthState()
  const isPassRule =
    isLogin && user?.role !== RoleUser.ANONYMOUS && user?.publicAddress

  if (!isPassRule) return <Login />

  return children
}

export default ProtectedByAuth
