import { ClipboardTextIcon } from "@components/Icons/ClipboardTextIcon"
import CategoryLabel from "./CategoryLabel"
import { Button } from "@nextui-org/react"

const Monetization = () => {
  return (
    <div>
      <CategoryLabel text="Monetization" icon={<ClipboardTextIcon />} />
      <Button className="text-base-14 mt-2 h-auto rounded-full bg-mercury-800 py-[2px] font-bold text-mercury-30 max-sm:text-12">
        COMING SOON
      </Button>
    </div>
  )
}

export default Monetization
