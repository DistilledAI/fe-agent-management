import { useAppDispatch } from "./useAppRedux"
import { logout as logoutSlice } from "@reducers/userSlice"
import { useQueryClient } from "@tanstack/react-query"

const useAuthAction = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const logout = () => {
    dispatch(logoutSlice())
    queryClient.removeQueries()
  }

  return { logout }
}

export default useAuthAction
