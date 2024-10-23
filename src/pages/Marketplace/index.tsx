import { FilledSquareCircleIcon } from "@components/Icons/FilledSquareCircleIcon"
import { PATH_NAMES } from "@constants/index"
import useWindowSize from "@hooks/useWindowSize"
import { Button, useDisclosure } from "@nextui-org/react"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import MarketplaceDesktop from "./Desktop"
import GenAITools from "./GenAITools"
import MarketplaceMobile from "./Mobile"
import PrivateAgents from "./PrivateAgents"
import Productivity from "./Productivity"
import { useAppSelector } from "@hooks/useAppRedux"
import { twMerge } from "tailwind-merge"

const Marketplace = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isMobile } = useWindowSize()
  const navigate = useNavigate()
  const location = useLocation()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  useEffect(() => {
    if (!isMobile && location.pathname === PATH_NAMES.MARKETPLACE) {
      navigate(PATH_NAMES.HOME)
    }
  }, [isMobile, location.pathname])

  const CATEGORIES = [
    {
      key: "private-agents",
      name: "Private agents",
      component: <PrivateAgents onClose={onClose} />,
      isComing: false,
    },
    {
      key: "productivity",
      name: "Productivity",
      component: <Productivity />,
      isComing: true,
    },
    {
      key: "gen-ai-tools",
      name: "GenAI Tools",
      component: <GenAITools />,
      isComing: true,
    },
    {
      key: "learning",
      name: "Learning",
      component: <div className="text-base-md">Coming soon...</div>,
      isComing: false,
    },
    {
      key: "wellness",
      name: "Wellness",
      component: <div className="text-base-md">Coming soon...</div>,
      isComing: false,
    },
    {
      key: "search-engine",
      name: "Search engine",
      component: <div className="text-base-md">Coming soon...</div>,
      isComing: false,
    },
    {
      key: "foundational-access",
      name: "Foundational access",
      component: <div className="text-base-md">Coming soon...</div>,
      isComing: false,
    },
    {
      key: "sns",
      name: "SNS",
      component: <div className="text-base-md">Coming soon...</div>,
      isComing: false,
    },
    {
      key: "finance",
      name: "Finance",
      component: <div className="text-base-md">Coming soon...</div>,
      isComing: false,
    },
    {
      key: "characters-org",
      name: "Characters & Org",
      component: <div className="text-base-md">Coming soon...</div>,
      isComing: false,
    },
  ]

  return isMobile ? (
    <MarketplaceMobile categories={CATEGORIES} />
  ) : (
    <>
      <Button
        onClick={onOpen}
        className={twMerge(
          "btn-primary min-h-[60px]",
          sidebarCollapsed && "min-h-14 min-w-14",
        )}
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
      <MarketplaceDesktop
        categories={CATEGORIES}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}

export default Marketplace
