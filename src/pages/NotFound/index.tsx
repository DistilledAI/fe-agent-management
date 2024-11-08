import DistilledAILogo from "@components/DistilledAILogo"
import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { TelegramIcon } from "@components/Icons/SocialLinkIcon"
import { TwitterIcon } from "@components/Icons/Twitter"
import { PATH_NAMES } from "@constants/index"
import Spline from "@splinetool/react-spline"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const PageNotFound = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 1000)
  }, [])

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <Spline scene="https://prod.spline.design/AXH5C-2Lfy1A2YIg/scene.splinecode" />
      <div
        className={twMerge("opacity-0 duration-500", visible && "opacity-100")}
      >
        <Link
          to={PATH_NAMES.HOME}
          className="absolute bottom-[150px] left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-mercury-950 px-5 py-[14px] hover:opacity-90"
        >
          <span className="text-nowrap text-16 font-medium text-mercury-30 max-sm:text-14">
            Go to Mesh Homepage
          </span>
          <div className="rotate-180">
            <ArrowLeftFilledIcon color="white" />
          </div>
        </Link>
        <div className="absolute bottom-5 right-5 flex items-center gap-3 rounded-[10px] bg-[#929493] px-4 py-2">
          <span className="text-[#000 mr-2 text-16 font-light">
            © 2024 Distilled AI
          </span>
          <Link to="https://x.com/distilled_AI" target="blank">
            <TwitterIcon color="#000" />
          </Link>
          <Link to="https://t.me/distilled_ai" target="blank">
            <TelegramIcon />
          </Link>
        </div>
        <p className="absolute left-1/2 top-10 -translate-x-1/2 text-nowrap font-medium text-mercury-900 max-sm:left-1/2 max-sm:top-12 max-sm:-translate-x-1/2 max-sm:text-14">
          The page you are looking for can’t be found
        </p>
        <div className="absolute left-5 top-[37px] max-sm:left-1/2 max-sm:top-4 max-sm:-translate-x-1/2">
          <DistilledAILogo />
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
