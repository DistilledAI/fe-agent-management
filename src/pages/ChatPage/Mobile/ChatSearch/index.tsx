import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { RoleUser } from "@constants/index"
import { Input } from "@nextui-org/react"
import { DebouncedFunc } from "lodash"
import React from "react"

const ChatSearch: React.FC<{
  inputRef: any
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  debounceSearch: DebouncedFunc<
    (keyword: string, role?: number) => Promise<void>
  >
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ inputRef, query, setQuery, debounceSearch, setIsSearch }) => {
  const handleOnChangeValue = (e: any) => {
    const value = e.currentTarget.value
    setQuery(value)
    debounceSearch(value)
  }

  const onClearInputValue = () => {
    setQuery("")
    debounceSearch("")
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
      onChange={handleOnChangeValue}
      value={query}
      ref={inputRef}
      onFocus={() => {
        setIsSearch(true)
        debounceSearch("", RoleUser.BOT)
      }}
    />
  )
}

export default ChatSearch
