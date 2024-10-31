import LeftContent from "./LeftContent"
import RightContent from "./RightContent"

const BitcoinMaxi: React.FC = () => {
  return (
    <div className="relative mx-auto h-[calc(100dvh-68px)] max-w-[1232px] px-6 max-lg:h-auto">
      <div className="flex h-full gap-10 pb-4 max-lg:h-auto max-lg:flex-col">
        <LeftContent />
        <RightContent />
      </div>
    </div>
  )
}
export default BitcoinMaxi
