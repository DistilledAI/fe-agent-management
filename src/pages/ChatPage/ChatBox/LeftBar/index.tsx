import Marketplace from "./Marketplace"
import MyEcho from "./MyEcho"
import Playground from "./Playground"
import PrivateAI from "./PrivateAI"

const LeftBar: React.FC = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <MyEcho />
        <PrivateAI />
      </div>
      <div className="flex-items-center h-[44px] justify-between gap-2">
        <Playground />
        <Marketplace />
      </div>
    </div>
  )
}
export default LeftBar
