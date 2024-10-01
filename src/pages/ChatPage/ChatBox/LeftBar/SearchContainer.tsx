import AvatarContainer from "@components/AvatarContainer"
import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import { Input } from "@nextui-org/react"
import { debounce } from "lodash"
import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserById, postChatSendToUser } from "services/chat"
import { ContentDisplayMode, DISPLAY_MODES } from "./PrivateAI"

const SearchContainer: React.FC<ContentDisplayMode> = ({
  onChangeDisplayMode,
}) => {
  const navigate = useNavigate()
  const inputRef = useRef<any>(null)
  const [query, setQuery] = useState<string>("")
  const [data, setData] = useState<any[]>([])
  const [_, setLoading] = useState<boolean>(true)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  const onBackToBoxMessage = () => {
    onChangeDisplayMode(DISPLAY_MODES.MESSAGES)
  }

  const onSearch = async (value: string) => {
    try {
      setLoading(true)
      const response = await getUserById(value)
      if (response) {
        return setData(response?.data?.items)
      }
      setData([])
    } catch (error) {
      console.log("error", error)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  const debounceSearch = debounce(onSearch, 500)
  const handleOnChangeValue = useCallback(
    (e: any) => {
      const value = e.currentTarget.value
      setQuery(value)
      debounceSearch(value)
    },
    [setQuery],
  )

  const handleSelectPerson = async (toUserId: number) => {
    try {
      const messages = "Hello"
      const response = await postChatSendToUser({ messages, toUserId })
      if (response) {
        const groupId = response?.data?.groupId
        onBackToBoxMessage()
        navigate(`/chat/${groupId}`)
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <>
      <div className="flex-items-center mb-4 justify-between gap-2 px-2">
        <div className="cursor-pointer" onClick={() => onBackToBoxMessage()}>
          <ArrowLeftFilledIcon />
        </div>
        <Input
          placeholder="Search"
          labelPlacement="outside"
          startContent={<FilledSearchIcon />}
          classNames={{
            inputWrapper:
              "!bg-mercury-200 rounded-full focus-visible:ring-opacity-0",
            innerWrapper:
              "!bg-mercury-200 rounded-full focus-visible:ring-opacity-0",
            input:
              "text-18 !text-mercury-950 caret-[#363636] focus-visible:ring-opacity-0",
          }}
          onChange={handleOnChangeValue}
          value={query}
          ref={inputRef}
        />
      </div>

      {data.map((chat) => {
        const toUserId = chat?.id || 0
        return (
          <div
            key={chat.id}
            onClick={() => handleSelectPerson(toUserId)}
            className="hover-light-effect relative mb-1 gap-2 rounded-full px-2 py-2"
          >
            <AvatarContainer
              badgeIcon={<FilledUserIcon size={14} />}
              avatarUrl={""}
              userName={chat?.username}
              badgeClassName="bg-[#0FE9A4]"
            />
          </div>
        )
      })}
    </>
  )
}
export default SearchContainer
