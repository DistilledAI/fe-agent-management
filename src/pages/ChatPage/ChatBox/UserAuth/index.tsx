import { userIcon } from "@assets/svg"
import { WalletIcon } from "@components/Icons/Wallet"
import { RootState } from "@configs/store"
import { Button, Image, useDisclosure } from "@nextui-org/react"
import { centerTextEllipsis } from "@utils/index"
import { useSelector } from "react-redux"
import AccountSetting from "./AccountSetting"
import { RoleUser } from "@constants/index"

interface UserAuthProps {
  connectWallet: any
  loading: boolean
}
const UserAuth: React.FC<UserAuthProps> = ({ connectWallet, loading }) => {
  const user = useSelector((state: RootState) => state.user.user)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const isShowInfo = user && user.role !== RoleUser.ANONYMOUS

  return isShowInfo ? (
    <>
      <Button
        onClick={onOpen}
        className="btn-primary h-11 w-fit max-sm:!h-auto max-sm:!w-auto max-sm:min-w-0 max-sm:gap-0 max-sm:p-0"
      >
        <div className="h-8 w-8 rounded-full border-1 border-mercury-400">
          <Image
            className="h-full w-full object-cover"
            alt="user"
            src={user.avatar ?? userIcon}
          />
        </div>
        <span className="text-base max-sm:hidden">
          {centerTextEllipsis(user.publicAddress, 6)}
        </span>
      </Button>
      <AccountSetting isOpen={isOpen} onClose={onClose} />
    </>
  ) : (
    <Button
      className="h-[44px] rounded-full bg-mercury-950 text-white max-sm:h-[36px]"
      isLoading={loading}
      onClick={connectWallet}
    >
      <div className="flex items-center gap-1 max-sm:hidden">
        {!loading && <WalletIcon />} Connect Wallet
      </div>
      <span className="hidden max-sm:block">Connect</span>
    </Button>
  )
}

export default UserAuth
