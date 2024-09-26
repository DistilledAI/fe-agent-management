import { Navigate, useLocation } from "react-router-dom"

export function RequireAuth({
  children,
  isAuthenticated,
}: {
  children: JSX.Element
  isAuthenticated: boolean
}) {
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  } else {
    return children
  }
}
