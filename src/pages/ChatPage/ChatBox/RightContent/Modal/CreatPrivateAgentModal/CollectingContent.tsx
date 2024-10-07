import DotLoading from "@components/DotLoading"
import useTextCreeping from "@hooks/useTextCreeping"

const LIST_TEXT_DEFAULT_1 = ["Your own private agent starts from here."]

const CollectingContent: React.FC = () => {
  const { text } = useTextCreeping({ listText: LIST_TEXT_DEFAULT_1 })

  return (
    <div className="w-[400px]">
      <div className="relative max-w-[250px] text-base transition-all duration-500 ease-linear">
        <span className="text-[24px] font-semibold text-mercury-950">
          {text}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-1">
        <DotLoading />
        <span className="text-base-m text-mercury-700">
          Collecting data in progress
        </span>
      </div>
    </div>
  )
}
export default CollectingContent
