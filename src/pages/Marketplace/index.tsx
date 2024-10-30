import { useEffect, useRef } from "react"
import GenAITools from "./GenAITools"
import PrivateAgents from "./PrivateAgents"
import Productivity from "./Productivity"
import { twMerge } from "tailwind-merge"
import ComingSoon from "@components/ComingSoon"
import { ScrollShadow } from "@nextui-org/react"
import useScrollTabActive from "./useScrollTabActive"
import { useAppSelector } from "@hooks/useAppRedux"

const Marketplace = () => {
  const siderCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  const CATEGORIES = [
    {
      id: "private-agents",
      name: "Private agents",
      component: <PrivateAgents />,
      isComing: false,
    },
    {
      id: "productivity",
      name: "Productivity",
      component: <Productivity />,
      isComing: true,
    },
    {
      id: "gen-ai-tools",
      name: "GenAI Tools",
      component: <GenAITools />,
      isComing: true,
    },
    {
      id: "learning",
      name: "Learning",
      component: <div className="text-base-md">Coming soon...</div>,
      isComing: false,
    },
    {
      id: "wellness",
      name: "Wellness",
      component: <div className="text-base-md">Coming soon...</div>,
      isComing: false,
    },
    {
      id: "search-engine",
      name: "Search engine",
      component: <div className="text-base-md">Coming soon...</div>,
      isComing: false,
    },
    {
      id: "foundational-access",
      name: "Foundational access",
      component: <div className="text-base-md">Coming soon...</div>,
      isComing: false,
    },
    {
      id: "sns",
      name: "SNS",
      component: <div className="text-base-md">Coming soon...</div>,
      isComing: false,
    },
    {
      id: "finance",
      name: "Finance",
      component: <div className="text-base-md">Coming soon...</div>,
      isComing: false,
    },
    {
      id: "characters-org",
      name: "Characters & Org",
      component: <div className="text-base-md">Coming soon...</div>,
      isComing: false,
    },
  ]

  const { activeId, handleTabClick, setElementIndex, elementIndex } =
    useScrollTabActive({
      items: CATEGORIES,
    })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeId === CATEGORIES[elementIndex]?.id) {
      const tabElement = document.getElementById(`category-tab-${elementIndex}`)
      if (tabElement) {
        tabElement.style.scrollMarginRight = "16px"
        tabElement.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "end",
        })
      }
    }
  }, [elementIndex, activeId])

  return (
    <>
      <div
        className={twMerge(
          "fixed top-[50px] z-10 flex max-w-full flex-col items-center space-y-4 overflow-x-auto bg-white pb-4 pt-2 transition-all duration-300 ease-in-out md:top-[68px] md:w-[calc(100%-329px)]",
          siderCollapsed && "md:w-[calc(100%-104px)]",
        )}
      >
        <h3 className="hidden text-24 font-semibold text-mercury-950 md:block">
          Marketplace
        </h3>
        <ScrollShadow
          hideScrollBar
          size={80}
          orientation="horizontal"
          className="z-10 flex max-w-full items-center gap-3 overflow-x-auto whitespace-nowrap bg-white px-4 backdrop-blur-[10px]"
          ref={containerRef}
        >
          {CATEGORIES.map((category, index) => (
            <button
              type="button"
              key={category.id}
              id={`category-tab-${index}`}
              onClick={() => {
                setElementIndex(index)
                handleTabClick(category.id)
              }}
              className={twMerge(
                "h-11 flex-shrink-0 rounded-full bg-mercury-50 px-4 text-[18px] text-mercury-900 transition-all duration-500 ease-linear",
                activeId === category.id && "bg-mercury-950 text-white",
              )}
            >
              {category.name}
            </button>
          ))}
        </ScrollShadow>
      </div>

      <div className="mx-auto flex h-full w-full max-w-[768px] flex-col gap-y-6 overflow-hidden bg-mercury-70 px-4 pb-20 pt-[100px] md:items-center md:bg-white md:pb-4 md:pt-[116px] 2xl:max-w-[940px]">
        {CATEGORIES.map((category, index) => (
          <div
            className="w-full space-y-3 transition-all duration-500 ease-in-out"
            key={`${category.id}-${index}`}
          >
            <h5
              className={twMerge(
                "text-[18px] text-mercury-900",
                activeId === category.id && "font-semibold text-mercury-950",
              )}
              id={category.id}
            >
              {category.name}
            </h5>
            <div
              className={twMerge(
                "grid min-h-[50dvh] grid-cols-1 justify-between gap-y-6 overflow-y-auto rounded-[22px] bg-mercury-30 px-1 py-3 md:grid-cols-2 md:gap-x-20 md:px-2 md:py-4",
                category.isComing && "overflow-y-visible",
              )}
              style={{ gridAutoRows: "max-content" }}
            >
              {category.isComing ? (
                <ComingSoon wrapperClassName="col-span-2">
                  <div
                    className={twMerge(
                      category.isComing && "space-y-3 px-2 opacity-60",
                    )}
                  >
                    {category.component}
                  </div>
                </ComingSoon>
              ) : (
                category.component
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Marketplace
