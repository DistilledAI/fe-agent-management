import { useAppSelector } from "@hooks/useAppRedux"
import useConnectWallet from "@hooks/useConnectWallet"
import useReconnectWallet from "@hooks/useReconnectWallet"
import { twMerge } from "tailwind-merge"
import UserAuth from "."

const UserAuthWrapper = () => {
  const { connectMultipleWallet } = useConnectWallet()
  useReconnectWallet()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  return (
    <div
      className={twMerge(
        "fixed right-0 top-0 z-20 w-full bg-white pl-[345px] text-end duration-300",
        sidebarCollapsed && "pl-[120px]",
      )}
    >
      <div className="pb-2 pr-4 pt-4">
        <UserAuth connectWallet={connectMultipleWallet} />
      </div>
    </div>
  )
}

export default UserAuthWrapper
