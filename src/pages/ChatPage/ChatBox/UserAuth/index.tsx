import { userIcon } from "@assets/svg"
import { WalletIcon } from "@components/Icons/Wallet"
import { RootState } from "@configs/store"
import { Button, Image, useDisclosure } from "@nextui-org/react"
import { centerTextEllipsis, getActiveColorRandomById } from "@utils/index"
import { useSelector } from "react-redux"
import AccountSetting from "./AccountSetting"
import { PATH_NAMES, RoleUser } from "@constants/index"
import { DatabaseSearchIcon } from "@components/Icons/DatabaseImportIcon"
import { useLocation, useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import ChatInfoCurrent from "@components/ChatInfoCurrent"
import useFetchDetail from "@pages/ChatPage/Mobile/ChatDetail/useFetch"

interface UserAuthProps {
  connectWallet: any
  loading: boolean
}
const UserAuth: React.FC<UserAuthProps> = ({ connectWallet, loading }) => {
  const user = useSelector((state: RootState) => state.user.user)
  const navigate = useNavigate()
  const { groupDetail, chatId } = useFetchDetail()
  const { pathname } = useLocation()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const { textColor } = getActiveColorRandomById(chatId)
  const isHiddenMyData = pathname === PATH_NAMES.MY_DATA
  const isShowInfo =
    user && user.publicAddress && user.role !== RoleUser.ANONYMOUS

  return (
    <div className="flex items-center justify-between">
      <div>
        <ChatInfoCurrent groupDetail={groupDetail} textColor={textColor} />
      </div>
      {isShowInfo ? (
        <div className="inline-flex items-center gap-2">
          <Button
            onClick={() => navigate(PATH_NAMES.MY_DATA)}
            className={twMerge(
              "btn-primary hidden h-11 md:block",
              isHiddenMyData && "!hidden",
            )}
          >
            <div className="flex items-center gap-1">
              <DatabaseSearchIcon />
              <span className="text-base">My Data</span>
            </div>
          </Button>
          <Button
            onClick={onOpen}
            className="btn-primary h-11 w-fit max-md:!h-auto max-md:!w-auto max-md:min-w-0 max-md:gap-0 max-md:p-0"
          >
            <div className="h-8 w-8 rounded-full border-1 border-mercury-400">
              <Image
                className="h-full w-full object-cover"
                alt="user"
                src={user.avatar ?? userIcon}
                disableAnimation={true}
              />
            </div>
            <span className="text-base max-md:hidden">
              {centerTextEllipsis(user.publicAddress, 6)}
            </span>
          </Button>
          <AccountSetting isOpen={isOpen} onClose={onClose} />
        </div>
      ) : (
        <Button
          className="h-[44px] rounded-full bg-mercury-950 text-white max-md:h-[36px]"
          isLoading={loading}
          onClick={connectWallet}
        >
          <div className="flex items-center gap-1 max-md:hidden">
            {!loading && <WalletIcon />} Connect Wallet
          </div>
          <span className="hidden max-md:block">Connect</span>
        </Button>
      )}
    </div>
  )
}

export default UserAuth
