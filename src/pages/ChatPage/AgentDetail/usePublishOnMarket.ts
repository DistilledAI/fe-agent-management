import { useMutation } from "@tanstack/react-query"
import { publishMarketplace } from "services/chat"

const usePublishOnMarket = (callbackDone: () => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (botId: number) => {
      return publishMarketplace(botId)
    },
    onSuccess: () => {
      callbackDone()
    },
  })

  return { onPublishOnMarket: mutate, loading: isPending }
}

export default usePublishOnMarket
