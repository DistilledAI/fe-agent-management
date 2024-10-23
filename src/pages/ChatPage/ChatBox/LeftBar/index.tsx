import Marketplace from "@pages/Marketplace"
import MyEcho from "./MyEcho"
import Playground from "./Playground"
import PrivateAI from "./PrivateAI"
import { DistilledAIIcon } from "@components/Icons/DistilledAIIcon"

const LeftBar = () => {
  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-[32px] border border-mercury-100 bg-mercury-70 p-4">
      <div>
        <DistilledAIIcon
          baseClassName="w-fit h-fit rounded-none border-none flex-none"
          iconClassName="w-[38px] h-5"
        />
      </div>
      <div className="h-[calc(100%-44px)] max-h-full flex-1">
        <MyEcho />
        <PrivateAI />
      </div>
      <div className="flex-items-center h-[60px] justify-between gap-2">
        <Playground />
        <Marketplace />
      </div>
    </div>
  )
}
export default LeftBar
