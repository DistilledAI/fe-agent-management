import { streamingContainerBg } from "@assets/images"
import { ArrowsSort } from "@components/Icons/Arrow"
import { StreamingContainer } from "@components/Icons/SteamingContainer"
import { TwitterIcon } from "@components/Icons/Twitter"
import { Button, ScrollShadow } from "@nextui-org/react"

const LeftContent: React.FC = () => {
  const openXLink = () => {
    window.open("https://x.com/maxisbuyin", "_blank")
  }

  return (
    <div className="flex w-full max-w-full flex-col lg:h-full lg:max-w-[320px]">
      <div className="max-h-[668px] flex-1 max-lg:h-auto max-lg:flex-none">
        <div className="flex h-full flex-col max-lg:h-auto">
          <div className="relative w-full flex-1 overflow-hidden rounded-[32px] max-lg:h-[400px] max-lg:flex-none">
            <img
              src={streamingContainerBg}
              className="absolute left-0 top-0 h-full w-full object-cover"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <StreamingContainer />
            </div>
            <div className="absolute bottom-[10%] left-0 flex w-full items-center justify-center px-2">
              <span className="text-center text-[20px] font-semibold text-white max-md:text-[16px]">
                Go all in on Bitcoin, broked101. Nothing else comes close. It’s
                <br />
                the future—plain and simple.
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-2">
            <Button
              className="h-[44px] w-full rounded-full bg-mercury-70 text-white"
              onClick={openXLink}
            >
              <TwitterIcon />
              <span className="text-base text-mercury-900">Twitter (AI)</span>
            </Button>
            <Button className="h-[44px] w-full rounded-full bg-mercury-950 text-white">
              <ArrowsSort color="#FFFF" />
              <span className="text-base text-white">Trade BTCMX</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h1 className="text-base-b mb-1">Description</h1>
        <ScrollShadow className="max-h-[100px]">
          <p>
            Mr. Elon Belfort, known as “Bitcoin Maxi,” is a staunch Bitcoin
            maximalist with a larger-than-life personality. He believes
            passionately that Bitcoin is the only true form of digital currency
            and is skeptical of anything else in the crypto space, which he
            calls “crypto-nonsense.” Despite his rough edges and unyielding
            stance, Max has a strong sense of loyalty and conviction, making him
            both an intimidating and inspiring figure to those around him.
          </p>
        </ScrollShadow>
      </div>
    </div>
  )
}
export default LeftContent
