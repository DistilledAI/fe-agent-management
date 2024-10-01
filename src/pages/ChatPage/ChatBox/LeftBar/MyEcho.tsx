import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { useAppSelector } from "@hooks/useAppRedux"
import { AGENT_TYPE, updateAgentType } from "@reducers/chatbot/AgentSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const MyEcho: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const agentType = useAppSelector((state) => state.agents.agentType)
  const isActive = agentType === AGENT_TYPE.MY_ECHO

  const handleChooseMyEcho = () => {
    navigate("/")
    dispatch(updateAgentType(AGENT_TYPE.MY_ECHO))
  }

  return (
    <div
      className="flex-items-center hover-light-effect group relative gap-2 rounded-full border border-transparent px-2 py-4 hover:border-mercury-300 aria-selected:bg-mercury-100"
      onClick={() => handleChooseMyEcho()}
      aria-selected={!!isActive}
    >
      <FilledBrainAIIcon />
      <span className="text-base font-normal group-aria-selected:font-bold">
        My Private Agent
      </span>
      {isActive && (
        <div className="absolute -left-4 top-1/2 h-[40px] w-[5px] -translate-y-1/2 rounded-br-full rounded-tr-full bg-mercury-950" />
      )}
    </div>
  )
}
export default MyEcho
