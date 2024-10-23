import { useAppSelector } from "@hooks/useAppRedux"
import UserAuth from "."
import useConnectWallet from "@hooks/useConnectWallet"
import { twMerge } from "tailwind-merge"
import useReconnectWallet from "@hooks/useReconnectWallet"

const UserAuthWrapper = () => {
  const { loading, connectWallet } = useConnectWallet()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  useReconnectWallet()

  return (
    <div
      className={twMerge(
        "fixed right-0 top-0 z-20 w-[calc(100%-313px)] bg-white text-end",
        sidebarCollapsed && "w-[calc(100%-102px)]",
      )}
    >
      <div className="pb-2 pr-4 pt-4">
        <UserAuth connectWallet={connectWallet} loading={loading} />
      </div>
    </div>
  )
}

export default UserAuthWrapper
