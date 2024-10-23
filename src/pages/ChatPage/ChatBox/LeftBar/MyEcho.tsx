import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { PATH_NAMES } from "@constants/index"
import { AGENT_TYPE, updateAgentType } from "@reducers/agentSlice"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import ActiveEffect from "./ActiveEffect"
import { useAppSelector } from "@hooks/useAppRedux"
import { twMerge } from "tailwind-merge"

const MyEcho: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { privateChatId } = useParams()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  const isActive = [
    PATH_NAMES.HOME,
    PATH_NAMES.PRIVATE_AGENT + "/" + privateChatId,
  ].includes(location.pathname)

  const handleChooseMyEcho = () => {
    navigate("/")
    dispatch(updateAgentType(AGENT_TYPE.MY_ECHO))
  }

  return (
    <div
      className={twMerge(
        "hover-light-effect relative flex h-14 items-center gap-2 rounded-full border-white bg-mercury-30 px-2 py-4",
        !!isActive && "border-mercury-100 bg-mercury-100",
        sidebarCollapsed && "w-14 justify-center",
      )}
      onClick={() => handleChooseMyEcho()}
    >
      <FilledBrainAIIcon />
      <span
        className={twMerge(
          "whitespace-nowrap text-[16px] font-normal",
          !!isActive && "font-semibold",
          sidebarCollapsed && "hidden",
        )}
      >
        My Private Agent
      </span>

      <ActiveEffect isActive={isActive} className="bg-mercury-950" />
    </div>
  )
}
export default MyEcho
