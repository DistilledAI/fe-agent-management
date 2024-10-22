import { useAppDispatch } from "./useAppRedux"
import { logout as logoutSlice } from "@reducers/userSlice"
import { useQueryClient } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"

const useAuthAction = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const logout = () => {
    dispatch(logoutSlice())
    const ignoreKeys = [QueryDataKeys.PRIVATE_AGENTS_MKL]
    queryClient.removeQueries({
      queryKey: Object.values(QueryDataKeys).filter(
        (key) => !ignoreKeys.includes(key),
      ),
    })
  }

  return { logout }
}

export default useAuthAction
