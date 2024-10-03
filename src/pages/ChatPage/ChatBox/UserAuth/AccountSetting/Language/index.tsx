import { WorldGlobalIcon } from "@components/Icons/World"
import { Select, SelectItem } from "@nextui-org/react"

const Language = () => {
  return (
    <div className="rounded-[22px] border-1 border-white bg-mercury-30 p-4">
      <div className="mb-4 flex items-center gap-2">
        <WorldGlobalIcon />
        <span className="font-medium text-mercury-600">Language</span>
      </div>
      <Select
        placeholder="Select language"
        className="w-full"
        classNames={{
          trigger: "rounded-full !bg-mercury-100",
        }}
        defaultSelectedKeys={["english"]}
        disableSelectorIconRotation
        selectionMode="single"
      >
        <SelectItem key={"english"}>English</SelectItem>
      </Select>
    </div>
  )
}

export default Language
