import { StyleBoxChatProvider } from "@pages/ChatPage/ChatBox/StyleProvider"
import LeftContent from "./LeftContent"
import RightContent from "./RightContent"

const BitcoinMaxi: React.FC = () => {
  return (
    <StyleBoxChatProvider>
      <div className="flex h-full max-h-dvh w-full gap-8 px-8 py-4">
        <LeftContent />
        <RightContent />
      </div>
    </StyleBoxChatProvider>
  )
}
export default BitcoinMaxi
