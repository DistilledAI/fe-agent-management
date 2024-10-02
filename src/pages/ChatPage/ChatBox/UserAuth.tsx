import { logoutIcon } from "@assets/svg"
import { WalletIcon } from "@components/Icons/Wallet"
import { RootState } from "@configs/store"
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
import { useDispatch, useSelector } from "react-redux"

interface UserAuthProps {
  connectWallet: any
  loading: boolean
}
const UserAuth: React.FC<UserAuthProps> = ({ connectWallet, loading }) => {
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()

  useFetchMe()

  return user ? (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button className="btn-primary h-11 w-fit">
          <div className="h-8 w-8 rounded-full border-1 border-mercury-400">
            <Image
              className="h-full w-full object-cover"
              alt="user"
              src={user.avatar}
            />
          </div>
          <span className="text-base">
            {centerTextEllipsis(user.publicAddress, 6)}
          </span>
        </Button>
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
