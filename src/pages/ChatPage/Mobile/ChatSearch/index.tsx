import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { Input } from "@nextui-org/react"
import { useState } from "react"

const ChatSearch = () => {
  const [query, setQuery] = useState<string>("")

  const onClearInputValue = () => {
    setQuery("")
  }

  return (
    <Input
      placeholder="Search"
      labelPlacement="outside"
      startContent={<FilledSearchIcon />}
      endContent={
        query && (
          <div
            className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-mercury-300 p-[2px]"
            onClick={() => onClearInputValue()}
          >
            <CloseFilledIcon size={18} color="#676767" />
          </div>
        )
      }
      classNames={{
        inputWrapper:
          "!bg-mercury-70 rounded-full focus-visible:ring-opacity-0",
        innerWrapper:
          "!bg-mercury-70 rounded-full focus-visible:ring-opacity-0",
        input:
          "text-15 !text-mercury-900 caret-[#363636] focus-visible:ring-opacity-0",
      }}
    />
  )
}

export default ChatSearch
