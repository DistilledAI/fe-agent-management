import { useEffect, useRef, useState } from "react"
import GenAITools from "./GenAITools"
import PrivateAgents from "./PrivateAgents"
import Productivity from "./Productivity"
import { twMerge } from "tailwind-merge"
import ComingSoon from "@components/ComingSoon"
import { ScrollShadow } from "@nextui-org/react"
import useScrollTabActive from "./useScrollTabActive"

const Marketplace = () => {
  const [slider, setSlider] = useState(0)

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

  const { activeId, handleTabClick } = useScrollTabActive({ items: CATEGORIES })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (slider >= 3 && containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 300,
        behavior: "smooth",
      })
    }
    if (slider <= 2 && containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 300,
        behavior: "smooth",
      })
    }
  }, [slider])

  return (
    <>
      <div className="sticky top-[68px] z-10 flex flex-col items-center space-y-4 bg-white pb-4 pt-2">
        <h3 className="text-24 font-semibold text-mercury-950">Marketplace</h3>
        <ScrollShadow
          hideScrollBar
          size={80}
          orientation="horizontal"
          className="z-10 flex max-w-full items-center gap-3 overflow-x-auto whitespace-nowrap bg-white/85 px-4 backdrop-blur-[10px]"
          ref={containerRef}
        >
          {CATEGORIES.map((category, index) => (
            <button
              type="button"
              key={category.id}
              id={`category-button-${index}`}
              onClick={() => {
                setSlider(index)
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

      <div className="mx-auto flex h-full w-full max-w-[768px] flex-col gap-y-6 overflow-hidden px-4 max-md:pb-20 md:items-center">
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
                "grid min-h-[50dvh] grid-cols-2 justify-between gap-x-20 gap-y-6 overflow-y-auto rounded-[22px] bg-mercury-30 px-1 py-3 md:px-2 md:py-4",
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
