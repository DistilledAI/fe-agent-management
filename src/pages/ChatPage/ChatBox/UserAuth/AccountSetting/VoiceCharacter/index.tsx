import ComingSoon from "@components/ComingSoon"
import { StarUserIconOutline } from "@components/Icons/UserIcon"
import { Select, SelectItem } from "@nextui-org/react"

const VoiceCharacter = () => {
  return (
    <ComingSoon>
      <div className="rounded-[22px] border-1 border-white bg-mercury-30 p-4">
        <div className="mb-4 flex items-center gap-2">
          <StarUserIconOutline />
          <span className="font-medium text-mercury-600">Voice Character</span>
        </div>
        <Select
          placeholder="Select voice"
          className="w-full"
          classNames={{
            trigger: "rounded-full !bg-mercury-100",
          }}
          defaultSelectedKeys={["natasha"]}
          disableSelectorIconRotation
          selectionMode="single"
        >
          <SelectItem key={"natasha"} className="whitespace-nowrap">
            Natasha-Bristish
          </SelectItem>
        </Select>
      </div>
    </ComingSoon>
  )
}

export default VoiceCharacter
