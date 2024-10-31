import ChatLiveHeader from "./HeaderMobile"
import LeftContent from "./LeftContent"
import RightContent from "./RightContent"

const BitcoinMaxi: React.FC = () => {
  return (
    <div className="relative mx-auto h-[calc(100dvh-68px)] max-w-[1232px] px-6 max-lg:h-[calc(100dvh-150px)] max-lg:overflow-y-auto max-md:h-auto max-md:px-4 max-md:py-[60px]">
      <div className="md:hidden">
        <ChatLiveHeader />
      </div>
      <div className="flex h-full gap-10 pb-4 max-lg:h-auto max-lg:flex-col max-md:gap-5">
        <LeftContent />
        <RightContent />
      </div>
    </div>
  )
}
export default BitcoinMaxi
