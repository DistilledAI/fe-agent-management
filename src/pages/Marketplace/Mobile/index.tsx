import { useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { Button } from "@nextui-org/react"
import ComingSoon from "@components/ComingSoon"

interface Props {
  categories: any[]
}

const MarketplaceMobile = ({ categories }: Props) => {
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

  return (
    <>
      <div
        className="fixed z-10 flex w-full items-center gap-3 overflow-hidden overflow-x-scroll whitespace-nowrap bg-white/85 px-3 py-2 backdrop-blur-[10px] scrollbar-hide"
        ref={containerRef}
      >
        {categories.map((category, index) => (
          <Button
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
          </Button>
        ))}
      </div>

      <div className="relative mt-[60px] flex h-full w-full flex-col gap-6 overflow-hidden bg-mercury-70 px-3 py-2 max-md:pb-20 md:flex-row md:items-center">
        {categories.map((category, index) => (
          <div
            className="h-full space-y-3 transition-all duration-500 ease-in-out"
            id={`category-section-${index}`}
            key={`${category.key}-${index}`}
            ref={(el) => (sectionsRefs.current[index] = el)}
          >
            <h6 className={twMerge("text-[18px] text-mercury-900")}>
              {category.name}
            </h6>
            <div
              className={twMerge(
                "h-full w-full rounded-[22px] bg-mercury-30 p-1 shadow-5",
              )}
            >
              <div
                className={twMerge(
                  "max-h-[88%] min-h-[200px] space-y-3 overflow-y-auto px-1 py-3",
                  category.isComing && "overflow-y-visible",
                )}
              >
                {category.isComing ? (
                  <ComingSoon>
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
          </div>
        ))}
      </div>
    </>
  )
}

export default MarketplaceMobile
