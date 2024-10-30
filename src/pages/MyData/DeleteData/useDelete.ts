import { useMutation } from "@tanstack/react-query"
import { deleteMyBotData } from "services/user"

const useDeleteData = (callbackDone?: () => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { botId: number; ids: number[] }) => {
      return deleteMyBotData(data)
    },
    onSuccess: () => {
      if (callbackDone) callbackDone()
    },
  })

  return { onDelete: mutate, loading: isPending }
}

export default useDeleteData
