import { defineElement } from "@utils/index"
import { useState } from "react"
import MessagesContainer from "./MessagesContainer"
import SearchContainer from "./SearchContainer"

export const DISPLAY_MODES = {
  MESSAGES: "MESSAGES",
  SEARCH: "SEARCH",
  ADD_PERSON: "ADD_PERSON",
}

const MAP_CONTENT_BY_DISPLAY_MODE = {
  [DISPLAY_MODES.MESSAGES]: <MessagesContainer />,
  [DISPLAY_MODES.SEARCH]: <SearchContainer />,
}

export interface ContentDisplayMode {
  onChangeDisplayMode?: any
}

const PrivateAI: React.FC = () => {
  const [displayMode, setDisplayMode] = useState<string>(DISPLAY_MODES.SEARCH)

  const onChangeDisplayMode = (modeValue: string) => {
    setDisplayMode(modeValue)
  }

  return (
    <div>
      <div className="my-4 h-[1px] w-full bg-mercury-100" />
      {defineElement(MAP_CONTENT_BY_DISPLAY_MODE[displayMode], {
        onChangeDisplayMode,
      })}
    </div>
  )
}
export default PrivateAI
