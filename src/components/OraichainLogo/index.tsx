import { oraichainLogoImg } from "@assets/images"
import React from "react"
import { twMerge } from "tailwind-merge"

interface Props {
  logoWrapClassName?: string
  logoInnerClassName?: string
  logoUrl?: string
}

const OraichainLogo: React.FC<Props> = ({
  logoWrapClassName,
  logoInnerClassName,
  logoUrl = oraichainLogoImg,
}) => {
  return (
    <div
      className={twMerge(
        "w-fit rounded-full bg-gray-light-blue dark:bg-neutral-title p-3 flex items-center justify-center",
        logoWrapClassName,
      )}
    >
      <img
        src={logoUrl}
        alt="oraichain logo"
        className={twMerge(
          "h-[67px] w-[67px] object-cover",
          logoInnerClassName,
        )}
      />
    </div>
  )
}

export default OraichainLogo
