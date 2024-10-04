import { CopyIcon } from "@components/Icons/Copy"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { MetamaskIconSmall } from "@components/Icons/MetamaskIcon"
import { LogoutIcon } from "@components/Icons/OutputIcon"
import useAuthState from "@hooks/useAuthState"
import useOutsideClick from "@hooks/useOutSideClick"
import { logout } from "@reducers/user/UserSlice"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import React, { useRef } from "react"
import { useDispatch } from "react-redux"
import PrivateAgent from "./Agent"
import MyCredits from "./Credits"
import Language from "./Language"
import NotificationSetting from "./Notification"
import PrivateAgentPod from "./AgentPod"
import AgentCreative from "./Creative"
import VoiceChat from "./VoiceChat"
import VoiceCharacter from "./VoiceCharacter"

const AccountSetting: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const { user } = useAuthState()
  const dispatch = useDispatch()
  const accountRef = useRef<any>()
  useOutsideClick(accountRef, onClose)

  return (
    <div
      ref={accountRef}
      aria-checked={isOpen}
      style={{ boxShadow: "0px -32px 30px 0px #FFF inset" }}
      className="fixed bottom-0 left-1/2 z-[99] mx-auto h-[75%] w-[1100px] max-w-full -translate-x-1/2 translate-y-[100%] rounded-b-[32px] rounded-t-[40px] bg-[rgba(211,211,211,0.70)] backdrop-blur-[8px] duration-500 aria-checked:translate-y-0"
    >
      <div
        onClick={onClose}
        className="absolute right-5 top-10 z-[1] cursor-pointer"
      >
        <CloseFilledIcon />
      </div>
      <div
        aria-checked={isOpen}
        className="h-full w-full translate-y-[100px] px-[100px] py-9 delay-100 duration-500 aria-checked:translate-y-0"
      >
        <div className="text-center text-mercury-900">
          <p className="mb-1 text-24 font-semibold">My wallet</p>
          <div className="inline-flex items-center">
            <div
              onClick={(e) => copyClipboard(e, user?.publicAddress ?? "")}
              className="flex cursor-pointer"
            >
              <span>Address:</span>
              <span className="ml-1 font-semibold">
                {centerTextEllipsis(user?.publicAddress ?? "", 6)}
              </span>
            </div>
            <div
              onClick={(e) => copyClipboard(e, user?.publicAddress ?? "")}
              className="ml-3 cursor-pointer"
            >
              <CopyIcon />
            </div>
            <div className="ml-3">
              <MetamaskIconSmall />
            </div>
            <div
              onClick={() => {
                dispatch(logout())
                onClose()
              }}
              className="ml-3 cursor-pointer"
            >
              <LogoutIcon />
            </div>
          </div>
        </div>
        <div className="mt-9 flex max-h-[calc(100%-64px)] flex-wrap gap-6 overflow-y-auto pb-[60px] scrollbar-hide">
          <div className="w-[calc(56%-12px)]">
            <MyCredits />
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="w-[calc(50%-8px)]">
                <Language />
              </div>
              <div className="w-[calc(50%-8px)]">
                <NotificationSetting />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="w-[calc(60%-8px)]">
                <AgentCreative />
              </div>
              <div className="w-[calc(40%-8px)]">
                <VoiceChat />
                <div className="mt-4">
                  <VoiceCharacter />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[calc(44%-12px)]">
            <div>
              <PrivateAgent />
            </div>
            <div className="mt-4">
              <PrivateAgentPod />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSetting
