import ConnectWalletModal from "@components/ConnectWalletModal"
import useFetchMe from "@hooks/useFetchMe"
import { Outlet } from "react-router-dom"

const MainLayoutDesktop = () => {
  useFetchMe()

  return (
    <>
      <Outlet />
      <ConnectWalletModal />
    </>
  )
}

export default MainLayoutDesktop
