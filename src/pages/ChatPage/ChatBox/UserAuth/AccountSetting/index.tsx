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
      <div onClick={onClose} className="absolute right-5 top-10 cursor-pointer">
        <CloseFilledIcon />
      </div>
      <div className="w-full py-9">
        <div className="text-center text-mercury-900">
          <p className="mb-1 text-24 font-semibold">My account</p>
          <div className="inline-flex items-center">
            <div
              onClick={(e) => copyClipboard(e, user?.publicAddress ?? "")}
              className="flex cursor-pointer"
            >
              <span>Address:</span>
              <span className="ml-1 font-bold">
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
      </div>
    </div>
  )
}

export default AccountSetting
