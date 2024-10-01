import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { ContentDisplayMode, DISPLAY_MODES } from "./PrivateAI"

const SearchContainer: React.FC<ContentDisplayMode> = ({
  onChangeDisplayMode,
}) => {
  return (
    <div>
      <div
        className="cursor-pointer"
        onClick={() => onChangeDisplayMode(DISPLAY_MODES.MESSAGES)}
      >
        <ArrowLeftFilledIcon />
      </div>
    </div>
  )
}
export default SearchContainer
