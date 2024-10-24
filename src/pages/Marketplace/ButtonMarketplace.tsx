import { FilledSquareCircleIcon } from "@components/Icons/FilledSquareCircleIcon"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const ButtonMarketplace = () => {
  const navigate = useNavigate()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  return (
    <Button
      className={twMerge(
        "btn-primary min-h-[60px]",
        sidebarCollapsed && "min-h-14 min-w-14",
      )}
      onClick={() => navigate(PATH_NAMES.MARKETPLACE)}
    >
      <div>
        <FilledSquareCircleIcon />
      </div>
      <span
        className={twMerge(
          "text-[16px] text-mercury-900",
          sidebarCollapsed && "hidden",
        )}
      >
        Marketplace
      </span>
    </Button>
  )
}

export default ButtonMarketplace
