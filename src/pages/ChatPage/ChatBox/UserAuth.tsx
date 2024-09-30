import { logoutIcon, userIcon } from "@assets/svg"
import { WalletIcon } from "@components/Icons/Wallet"
import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import useFetchMe from "@hooks/useFetchMe"
import {
  Button,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react"
import { logout } from "@reducers/user/UserSlice"
import { centerTextEllipsis } from "@utils/index"
import { useDispatch } from "react-redux"

const UserAuth = () => {
  const { loading, connectWallet } = useConnectWallet()
  const { user } = useAuthState()
  const dispatch = useDispatch()

  useFetchMe()

  return user ? (
    <Popover placement="bottom">
      <PopoverTrigger>
        <div className="flex cursor-pointer items-center gap-2 rounded-full border-1 border-white bg-mercury-30 px-2 py-[5px]">
          <div className="h-8 w-8 rounded-full border-1 border-mercury-400">
            <Image
              className="h-full w-full object-cover"
              alt="user"
              src={userIcon}
            />
          </div>
          <span className="text-mercury-900">
            {centerTextEllipsis(user.publicAddress, 6)}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-[170px] rounded-md bg-mercury-30">
        <div className="w-full px-1 py-2">
          <Button
            onClick={() => dispatch(logout())}
            className="h-9 w-full gap-1 rounded-md border-1 border-mercury-400 bg-white font-semibold text-mercury-900"
          >
            Logout <Image alt="logout" className="w-5" src={logoutIcon} />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
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
