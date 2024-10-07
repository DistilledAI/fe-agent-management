import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { PATH_NAMES } from "@constants/index"
import { AGENT_TYPE, updateAgentType } from "@reducers/chatbot/AgentSlice"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import ActiveEffect from "./ActiveEffect"

const MyEcho: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = location.pathname === PATH_NAMES.HOME

  const handleChooseMyEcho = () => {
    navigate("/")
    dispatch(updateAgentType(AGENT_TYPE.MY_ECHO))
  }

  return (
    <div
      className="flex-items-center hover-light-effect group/item group relative gap-2 rounded-full px-2 py-4 aria-selected:bg-mercury-100"
      onClick={() => handleChooseMyEcho()}
      aria-selected={!!isActive}
    >
      <FilledBrainAIIcon />
      <span className="text-base font-normal group-aria-selected:font-bold">
        My Private Agent
      </span>

      <ActiveEffect isActive={isActive} className="bg-mercury-950" />
    </div>
  )
}
export default MyEcho
