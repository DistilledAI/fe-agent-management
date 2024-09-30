import useConnectWallet from "@hooks/useConnectWallet"
import ChatInput from "./ChatInput"
import LeftBar from "./LeftBar"
import MyPrivateAgentContent from "./RightContent/MyPrivateAgentContent"
import UserAuth from "./UserAuth"

const ChatBox = () => {
  const { loading, connectWallet } = useConnectWallet()

  return (
    <div className="flex h-full items-center justify-center pb-10 pt-[18px]">
      <div className="flex h-full w-full max-w-[1100px] flex-col gap-y-6 rounded-[32px] border border-mercury-100 bg-mercury-70 p-6">
        <div className="flex items-center justify-between">
          <h3 className="m-0 p-0 text-24 font-semibold text-black-999">
            Inbox
          </h3>
          <UserAuth connectWallet={connectWallet} loading={loading} />
        </div>
        <div className="grid h-full w-full grid-cols-3 gap-4">
          <div className="col-span-1 h-full w-full">
            <LeftBar />
          </div>
          <div className="col-span-2 h-full w-full">
            <MyPrivateAgentContent connectWalletLoading={loading} />
          </div>
        </div>
        <div className="space-y-4">
          <ChatInput />
        </div>
      </div>
    </div>
  )
}

export default ChatBox
