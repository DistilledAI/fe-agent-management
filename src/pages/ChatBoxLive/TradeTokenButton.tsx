import ComingSoon from "@components/ComingSoon"
import { ArrowsSort } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
import React from "react"
import { Link } from "react-router-dom"

const TradeTokenButton: React.FC<{
  isMaxi?: boolean
}> = ({ isMaxi }) => {
  return (
    <ComingSoon isOffComing={isMaxi} wrapperClassName="z-[11]">
      <Button
        as={Link}
        to={
          "https://dexscreener.com/solana/4Qgn7AixnZJBwfFL5XmRDBVyzzq9tC6JdDToaKVhPJvz"
        }
        target="blank"
        className="h-11 w-fit rounded-full bg-orange-500 text-white md:w-full"
        isDisabled={!isMaxi}
      >
        <ArrowsSort color="#FFFF" />
        <span className="text-base text-white">Trade</span>
      </Button>
    </ComingSoon>
  )
}

export default TradeTokenButton
