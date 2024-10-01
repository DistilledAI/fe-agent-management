import useConnectWallet from "@hooks/useConnectWallet"
import ChatInput from "./ChatInput"
import LeftBar from "./LeftBar"
import MyPrivateAgentContent from "./RightContent/MyPrivateAgentContent"
import UserAuth from "./UserAuth"
import DistilledAIIcon from "@components/Icons/DistilledAIIcon"

const ChatBox = () => {
  const { loading, connectWallet } = useConnectWallet()

  return (
    <div className="flex h-full items-center justify-center pb-10 pt-[18px]">
      <div className="flex h-full w-full max-w-[1100px] flex-col gap-y-4 rounded-[32px] border border-mercury-100 bg-mercury-70 p-4">
        <div className="flex items-center justify-between">
          <DistilledAIIcon
            baseClassName="w-fit h-fit rounded-none border-none flex-none"
            iconClassName="w-[38px] h-5"
          />
          <UserAuth connectWallet={connectWallet} loading={loading} />
        </div>
        <div className="grid h-full w-full grid-cols-[280px_1fr] gap-4">
          <LeftBar />
          <MyPrivateAgentContent connectWalletLoading={loading} />
        </div>
        <div className="space-y-4">
          <ChatInput />
        </div>
      </div>
    </div>
  )
}

export default ChatBox
