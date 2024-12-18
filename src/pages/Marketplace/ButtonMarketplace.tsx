import { xmasCircle3D } from "@assets/images"
import { PATH_NAMES } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const ButtonMarketplace = () => {
  const navigate = useNavigate()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  return (
    <Button
      className={twMerge(
        "btn-primary z-10 min-h-[60px] w-full",
        sidebarCollapsed && "min-h-14 min-w-14",
      )}
      onClick={() => navigate(PATH_NAMES.MARKETPLACE)}
    >
      <img src={xmasCircle3D} width={20} height={20} />
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
