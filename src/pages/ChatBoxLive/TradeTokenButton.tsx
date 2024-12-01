import ComingSoon from "@components/ComingSoon"
import { ArrowsSort } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
import React from "react"

const TradeTokenButton: React.FC<{
  isMaxi?: boolean
}> = ({ isMaxi }) => {
  const handleClickTrade = () => {
    if (isMaxi)
      window.open(
        "https://dexscreener.com/solana/4Qgn7AixnZJBwfFL5XmRDBVyzzq9tC6JdDToaKVhPJvz",
        "_blank",
      )
  }

  return (
    <ComingSoon isOffComing={isMaxi} wrapperClassName="z-[11]">
      <Button
        onClick={handleClickTrade}
        className="h-[38px] w-fit rounded-full bg-orange-500 text-white md:h-11 md:w-full"
        isDisabled={!isMaxi}
      >
        <ArrowsSort color="#FFFF" />
        <span className="text-base text-white">Trade</span>
      </Button>
    </ComingSoon>
  )
}

export default TradeTokenButton
