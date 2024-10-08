import { userIcon } from "@assets/svg"
import { WalletIcon } from "@components/Icons/Wallet"
import { RootState } from "@configs/store"
import useFetchMe from "@hooks/useFetchMe"
import { Button, Image, useDisclosure } from "@nextui-org/react"
import { centerTextEllipsis } from "@utils/index"
import { useSelector } from "react-redux"
import AccountSetting from "./AccountSetting"

interface UserAuthProps {
  connectWallet: any
  loading: boolean
}
const UserAuth: React.FC<UserAuthProps> = ({ connectWallet, loading }) => {
  const user = useSelector((state: RootState) => state.user.user)
  const { isOpen, onClose, onOpen } = useDisclosure()

  useFetchMe()

  return user?.publicAddress ? (
    <>
      <Button onClick={onOpen} className="btn-primary h-11 w-fit">
        <div className="h-8 w-8 rounded-full border-1 border-mercury-400">
          <Image
            className="h-full w-full object-cover"
            alt="user"
            src={user.avatar ?? userIcon}
          />
        </div>
        <span className="text-base">
          {centerTextEllipsis(user.publicAddress, 6)}
        </span>
      </Button>
      <AccountSetting isOpen={isOpen} onClose={onClose} />
    </>
  ) : (
    <Button
      className="h-[44px] rounded-full bg-mercury-950 text-white"
      isLoading={loading}
      onClick={connectWallet}
    >
      {!loading && <WalletIcon />} Connect Wallet
    </Button>
  )
}

export default UserAuth
