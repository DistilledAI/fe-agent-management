import { useEffect, useRef, useState } from "react"
import GenAITools from "./GenAITools"
import PrivateAgents from "./PrivateAgents"
import Productivity from "./Productivity"
import { twMerge } from "tailwind-merge"
import ComingSoon from "@components/ComingSoon"

const Marketplace = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
  const [isNavAction, setIsNavAction] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (isNavAction) return
      sectionsRefs.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect()
          const inView =
            rect.top >= 0 && rect.bottom <= window.innerHeight - 200
          if (inView) {
            setActiveCategoryIndex(index)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isNavAction])

  const scrollToSection = (index: number) => {
    setIsNavAction(true)
    setTimeout(() => {
      setIsNavAction(false)
    }, 2000)
    setActiveCategoryIndex(index)
    sectionsRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }

  const CATEGORIES = [
    {
      key: "private-agents",
      name: "Private agents",
      component: <PrivateAgents />,
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
      component: <div className="text-base-md h-[300px]">Coming soon...</div>,
      isComing: false,
    },
    {
      key: "wellness",
      name: "Wellness",
      component: <div className="text-base-md h-[300px]">Coming soon...</div>,
      isComing: false,
    },
    {
      key: "search-engine",
      name: "Search engine",
      component: <div className="text-base-md h-[300px]">Coming soon...</div>,
      isComing: false,
    },
    {
      key: "foundational-access",
      name: "Foundational access",
      component: <div className="text-base-md h-[300px]">Coming soon...</div>,
      isComing: false,
    },
    {
      key: "sns",
      name: "SNS",
      component: <div className="text-base-md h-[300px]">Coming soon...</div>,
      isComing: false,
    },
    {
      key: "finance",
      name: "Finance",
      component: <div className="text-base-md h-[300px]">Coming soon...</div>,
      isComing: false,
    },
    {
      key: "characters-org",
      name: "Characters & Org",
      component: <div className="text-base-md h-[300px]">Coming soon...</div>,
      isComing: false,
    },
  ]

  return (
    <>
      <div className="sticky top-[68px] z-10 space-y-4 bg-white pb-4 pt-2">
        <h3 className="text-center text-24 font-semibold text-mercury-950">
          Marketplace
        </h3>
        <div
          className="fixed z-10 flex items-center gap-3 overflow-hidden overflow-x-scroll whitespace-nowrap bg-white/85 px-4 backdrop-blur-[10px] scrollbar-hide md:static"
          ref={containerRef}
        >
          {CATEGORIES.map((category, index) => (
            <button
              type="button"
              key={category.key}
              id={`category-button-${index}`}
              className={twMerge(
                "h-11 flex-shrink-0 rounded-full bg-white px-4 text-[16px] text-mercury-900 transition-all duration-500 ease-in-out",
                activeCategoryIndex === index && "bg-mercury-900 text-white",
              )}
              onClick={() => scrollToSection(index)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto flex h-full w-full max-w-[768px] flex-col gap-y-6 overflow-hidden px-4 max-md:pb-20 md:items-center">
        {CATEGORIES.map((category, index) => (
          <div
            className="w-full space-y-3 transition-all duration-500 ease-in-out"
            id={`category-section-${index}`}
            key={`${category.key}-${index}`}
            ref={(el) => (sectionsRefs.current[index] = el)}
          >
            <h5
              className={twMerge(
                "text-[18px] text-mercury-900",
                activeCategoryIndex === index && "font-medium text-mercury-950",
              )}
            >
              {category.name}
            </h5>
            <div
              className={twMerge(
                "grid grid-cols-2 justify-between gap-x-20 gap-y-6 overflow-y-auto rounded-[22px] bg-mercury-30 px-1 py-3 md:px-2 md:py-4",
                category.isComing && "overflow-y-visible",
              )}
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
