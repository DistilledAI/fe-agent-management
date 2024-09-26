import { distilledAiLogo } from "@assets/images"
import { DISTILLED_AI_URL } from "@constants/index"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

type Props = {
  logoClassName?: string
}

const DistilledAILogo = ({ logoClassName }: Props) => {
  return (
    <Link to={DISTILLED_AI_URL}>
      <img
        src={distilledAiLogo}
        className={twMerge("max-md:h-6 max-md:w-32 md:h-[30px]", logoClassName)}
        alt="distilled AI logo"
      />
    </Link>
  )
}

export default DistilledAILogo
