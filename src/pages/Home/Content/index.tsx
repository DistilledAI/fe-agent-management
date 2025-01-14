import AvatarCustom from "@components/AvatarCustom"
import { CopyIcon } from "@components/Icons/Copy"
import { LogoutIcon } from "@components/Icons/OutputIcon"
import useAuthAction from "@hooks/useAuthAction"
import useAuthState from "@hooks/useAuthState"
import { Tabs, Tab } from "@nextui-org/react"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import LockToken from "./LockToken"
import AddToken from "./AddToken"
import Withdraw from "./Withdraw"
import WithdrawOtherToken from "./Withdraw/OtherToken"
import { useEffect, useState } from "react"
import ReactJson from "react-json-view"
import SwapOtherToken from "./SwapToken/OtherToken"
import MigrateWalletByOwnerSol from "./Migrate"
import Treasury from "./Treasury"
import { fetchApiAuth } from "services/fetchApi"
import endpoint from "services/endpoint"
import { useAppSelector } from "@hooks/useAppRedux"

const HomeContent = () => {
  const { user, isAnonymous, isLogin } = useAuthState()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const [infoAgent, setInfoAgent] = useState<any>()
  const isConnectWallet = isLogin && !isAnonymous
  const { logout } = useAuthAction()

  const getAgentInfo = async () => {
    try {
      const res = await fetchApiAuth({
        method: "post",
        url: endpoint.CALL_AGENT,
        data: {
          botId: myAgent?.id,
          path: "/private_agent/info",
        },
      })
      if (res.data) setInfoAgent(res.data)
    } catch (error) {
      console.error(error)
      setInfoAgent(undefined)
    }
  }

  useEffect(() => {
    if (isConnectWallet) getAgentInfo()
    else setInfoAgent(undefined)
  }, [isConnectWallet])

  return (
    <div className="mx-auto max-w-[1232px] px-4 py-10">
      {isConnectWallet && (
        <div className="flex items-center gap-2">
          <AvatarCustom
            publicAddress={user.publicAddress}
            src={user.avatar}
            className="h-8 w-8"
          />
          <p className="font-medium">
            {centerTextEllipsis(user.publicAddress)}
          </p>
          <div
            className="cursor-pointer"
            onClick={(e) => copyClipboard(e, user.publicAddress)}
          >
            <CopyIcon />
          </div>
          <div onClick={logout} className="cursor-pointer">
            <LogoutIcon color="red" />
          </div>
        </div>
      )}
      {/* <div className="mt-10 w-[400px] max-w-full">
        <p className="mb-1 text-15 font-medium">
          Enter Endpoint <span className="text-red-500">(*)</span>
        </p>
      </div> */}
      {infoAgent && (
        <div className="mt-3">
          <p className="mb-1 text-15 font-medium">Info agent:</p>
          <ReactJson collapsed={true} src={infoAgent} />
        </div>
      )}
      <div className="mt-5">
        <Tabs
          classNames={{ tabContent: "font-medium text-15" }}
          aria-label="Options"
        >
          <Tab key="add-whitelist" title="Add Whitelist">
            <AddToken />
          </Tab>
          <Tab key="lock-token" title="Lock Token">
            <LockToken agentAddress={infoAgent?.sol_address} />
          </Tab>
          <Tab key="withdraw-token" title="Withdraw Token">
            <Withdraw />
            <WithdrawOtherToken />
          </Tab>
          <Tab key="swap-token" title="Swap Token">
            <SwapOtherToken botInfo={infoAgent} />
          </Tab>
          <Tab key="treasury" title="Treasury">
            <Treasury botInfo={infoAgent} />
          </Tab>
          <Tab key="migrate" title="Migrate">
            <MigrateWalletByOwnerSol />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default HomeContent
