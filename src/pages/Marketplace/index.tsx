import DrawerBottom from "@components/DrawerBottom"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { FilledSquareCircleIcon } from "@components/Icons/FilledSquareCircleIcon"
import { Button, useDisclosure } from "@nextui-org/react"
import { twMerge } from "tailwind-merge"
import PrivateAgents from "./PrivateAgents"
// import useAuthState from "@hooks/useAuthState"
import Productivity from "./Productivity"
import ComingSoon from "@components/ComingSoon"
import GenAITools from "./GenAITools"
import useSliderMrkt from "./useSliderMrkt"
import { useEffect, useRef } from "react"

const Marketplace = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const { isLogin } = useAuthState()
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

  const { slider, onPrevSlider, onNextSlider, setSlider } = useSliderMrkt({
    isOpen,
    itemsCount: CATEGORIES.length - 1,
  })

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (slider > 3 && containerRef.current) {
      console.log({ containerRef, scrollLeft: containerRef.current.scrollLeft })
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 500,
        behavior: "smooth",
      })
    }
    if (slider < 7 && containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 500,
        behavior: "smooth",
      })
    }
  }, [slider])

  return (
    <>
      <Button
        onClick={onOpen}
        // isDisabled={!isLogin}
        className="btn-primary min-h-[60px]"
      >
        <div>
          <FilledSquareCircleIcon />
        </div>
        Marketplace
      </Button>
      <DrawerBottom
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          base: "h-[calc(100dvh-72px)] rounded-t-[32px]",
          body: "px-0",
        }}
      >
        <h3 className="mb-6 text-center text-24 font-semibold">Marketplace</h3>
        <div
          className="flex w-full items-center gap-4 overflow-hidden overflow-x-auto whitespace-nowrap px-20 pb-3 scrollbar-hide"
          ref={containerRef}
        >
          {CATEGORIES.map((category, index) => (
            <Button
              key={category.key}
              className={twMerge(
                "r h-11 flex-shrink-0 rounded-full bg-white px-4 text-[16px] font-medium text-mercury-900 transition-all duration-500 ease-in-out",
                slider === index &&
                  "h-14 !bg-mercury-950 px-6 text-[18px] font-normal text-mercury-30",
              )}
              onClick={() => setSlider(index)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <div
          className="relative flex h-full w-full items-center gap-4 overflow-hidden px-20 pb-3"
          id="slider-container"
        >
          {CATEGORIES.map((category, index) => (
            <div
              className={
                "mt-3 h-full space-y-3 transition-all duration-500 ease-in-out"
              }
              key={`${category.key}-${index}`}
              style={{
                transform: `translateX(calc(-${slider} * 100% - ${slider} * 16px))`,
              }}
            >
              <h6
                className={twMerge(
                  "text-[13px] font-medium text-mercury-700",
                  slider === index && "font-semibold text-mercury-950",
                )}
              >
                {category.name}
              </h6>
              <div
                className={twMerge(
                  "h-full min-w-[350px] rounded-[22px] bg-mercury-30 p-1 shadow-5",
                )}
              >
                <div
                  className={twMerge(
                    "max-h-[88%] space-y-3 overflow-y-auto px-1 py-3 pb-10",
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
          <Button
            className="fixed left-4 h-[68px] min-w-[68px] rounded-full border border-mercury-100 bg-white shadow-5"
            onClick={onPrevSlider}
          >
            <div className="rotate-90">
              <ChevronDownIcon />
            </div>
          </Button>
          <Button
            className="fixed right-4 h-[68px] min-w-[68px] rounded-full border border-mercury-100 bg-white shadow-5"
            onClick={onNextSlider}
          >
            <div className="-rotate-90">
              <ChevronDownIcon />
            </div>
          </Button>
        </div>
      </DrawerBottom>
    </>
  )
}

export default Marketplace
