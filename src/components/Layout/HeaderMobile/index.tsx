import { BarIcon } from "@components/Icons/Bar"
import { DistilledIconNoText } from "@components/Icons/DistilledAIIcon"
import useConnectWallet from "@hooks/useConnectWallet"
import { useDisclosure } from "@nextui-org/react"
import UserAuth from "@pages/ChatPage/ChatBox/UserAuth"
import React from "react"
import DrawerLeft from "./DrawerLeft"
import { Link } from "react-router-dom"
import { DISTILLED_AI_URL } from "@constants/index"

const HeaderMobile: React.FC = () => {
  const { loading, connectWallet } = useConnectWallet()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-[50px] w-full items-center justify-between bg-white px-4">
        <div onClick={onOpen}>
          <BarIcon />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link target="_blank" to={DISTILLED_AI_URL}>
            <DistilledIconNoText />
          </Link>
        </div>
        <UserAuth loading={loading} connectWallet={connectWallet} />
      </div>
      <DrawerLeft isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default HeaderMobile
