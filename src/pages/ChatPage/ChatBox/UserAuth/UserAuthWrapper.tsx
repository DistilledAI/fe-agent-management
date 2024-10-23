import UserAuth from "."
import useConnectWallet from "@hooks/useConnectWallet"
import useReconnectWallet from "@hooks/useReconnectWallet"

const UserAuthWrapper = () => {
  const { loading, connectWallet } = useConnectWallet()
  useReconnectWallet()

  return (
    <div className="fixed right-0 top-0 z-20 w-full bg-white text-end">
      <div className="pb-2 pr-4 pt-4">
        <UserAuth connectWallet={connectWallet} loading={loading} />
      </div>
    </div>
  )
}

export default UserAuthWrapper
