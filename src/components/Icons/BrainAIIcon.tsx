import { brainAIIcon } from "@assets/svg"
import { Image } from "@nextui-org/react"

const BrainAIIcon = () => {
  return (
    <div className="h-14 w-14 rounded-full border border-mercury-900 bg-mercury-950 p-[6px]">
      <div className="flex h-full w-full items-center justify-center rounded-full border border-mercury-900 bg-white">
        <Image src={brainAIIcon} alt="brain AI icon" className="h-6 w-6" />
      </div>
    </div>
  )
}

export default BrainAIIcon
