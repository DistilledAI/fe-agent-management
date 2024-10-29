import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import { AGENT_TYPE, updateAgentType } from "@reducers/agentSlice"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import ActiveEffect from "./ActiveEffect"

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
        "relative flex h-14 cursor-pointer items-center gap-2 rounded-full border-white bg-mercury-30 px-2 py-4",
        !!isActive && "border-mercury-100 bg-mercury-950 text-mercury-30",
        !isActive && "hover-light-effect",
        sidebarCollapsed && "w-14 justify-center",
      )}
      onClick={() => handleChooseMyEcho()}
    >
      <FilledBrainAIIcon
        color={isActive ? "rgba(250, 250, 250, 1)" : "#545454"}
      />
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
