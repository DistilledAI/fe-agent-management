import { TwitterIcon } from "@components/Icons/Twitter"
import { Button } from "@nextui-org/react"
import { Link } from "react-router-dom"

const TwitterButton = () => {
  return (
    <Button
      as={Link}
      to="https://x.com/maxisbuyin"
      target="_blank"
      className="h-14 w-full rounded-full bg-mercury-70 text-white md:h-11"
    >
      <TwitterIcon />
      <span className="text-base text-mercury-900">Twitter (AI)</span>
    </Button>
  )
}

export default TwitterButton
