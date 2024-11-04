import Login from "@components/Login"
import { RoleUser } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import React from "react"
import { Outlet } from "react-router-dom"

const ProtectedByAuth: React.FC = () => {
  const { isLogin, user } = useAuthState()
  const isPassRule =
    isLogin && user?.role !== RoleUser.ANONYMOUS && user?.publicAddress

  if (!isPassRule) return <Login />

  return <Outlet />
}

export default ProtectedByAuth
