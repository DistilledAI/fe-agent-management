import { TwitterIcon } from "@components/Icons/Twitter"
import { Button } from "@nextui-org/react"

const TwitterButton = () => {
  const openXLink = () => {
    window.open("https://x.com/maxisbuyin", "_blank")
  }

  return (
    <Button
      className="h-14 w-full rounded-full bg-mercury-70 text-white md:h-11"
      onClick={openXLink}
    >
      <TwitterIcon />
      <span className="text-base text-mercury-900">Twitter (AI)</span>
    </Button>
  )
}

export default TwitterButton
