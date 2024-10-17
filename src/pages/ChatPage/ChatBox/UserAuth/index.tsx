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
      <Button
        onClick={onOpen}
        className="btn-primary max-sm:!h-auto max-sm:!w-auto max-sm:min-w-0 max-sm:gap-0 max-sm:p-0 h-11 w-fit"
      >
        <div className="h-8 w-8 rounded-full border-1 border-mercury-400">
          <Image
            className="h-full w-full object-cover"
            alt="user"
            src={user.avatar ?? userIcon}
          />
        </div>
        <span className="max-sm:hidden text-base">
          {centerTextEllipsis(user.publicAddress, 6)}
        </span>
      </Button>
      <AccountSetting isOpen={isOpen} onClose={onClose} />
    </>
  ) : (
    <Button
      className="max-sm:h-[36px] h-[44px] rounded-full bg-mercury-950 text-white"
      isLoading={loading}
      onClick={connectWallet}
    >
      <div className="max-sm:hidden flex items-center gap-1">
        {!loading && <WalletIcon />} Connect Wallet
      </div>
      <span className="max-sm:block hidden">Connect</span>
    </Button>
  )
}

export default UserAuth
