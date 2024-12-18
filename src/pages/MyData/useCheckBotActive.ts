import { STATUS_AGENT } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"

const useCheckBotActive = () => {
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  const isBotActive = myAgent?.status === STATUS_AGENT.ACTIVE

  return { isBotActive }
}

export default useCheckBotActive
