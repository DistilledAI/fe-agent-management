import AvatarCustom from "@components/AvatarCustom"
import ChatInfoCurrent from "@components/ChatInfoCurrent"
import { DatabaseSearchIcon } from "@components/Icons/DatabaseImportIcon"
import { WalletIcon } from "@components/Icons/Wallet"
import { RootState } from "@configs/store"
import { PATH_NAMES, RoleUser } from "@constants/index"
import { Button } from "@nextui-org/react"
import useFetchDetail from "@pages/ChatPage/Mobile/ChatDetail/useFetch"
import { useQuery } from "@tanstack/react-query"
import { getActiveColorRandomById } from "@utils/index"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { getMyPrivateAgent } from "services/chat"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"

interface UserAuthProps {
  connectWallet: any
  loading: boolean
}
const UserAuth: React.FC<UserAuthProps> = ({ connectWallet, loading }) => {
  const user = useSelector((state: RootState) => state.user.user)
  const navigate = useNavigate()
  const { groupDetail, chatId } = useFetchDetail()
  const { pathname } = useLocation()

  const { data } = useQuery({
    queryKey: [QueryDataKeys.MY_BOT_LIST],
    queryFn: getMyPrivateAgent,
    refetchOnWindowFocus: false,
  })
  const hasBot = data ? data.data.items.length > 0 : false
  const { textColor } = getActiveColorRandomById(chatId)
  const isHiddenMyData = pathname === PATH_NAMES.MY_DATA || !hasBot
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
            onClick={() => navigate(PATH_NAMES.ACCOUNT)}
            className="btn-primary h-11 w-fit max-md:!h-auto max-md:!w-auto max-md:min-w-0 max-md:gap-0 max-md:p-0"
          >
            <AvatarCustom
              publicAddress={user.publicAddress}
              src={user.avatar}
              className="h-8 w-8"
            />
            <span className="line-clamp-1 block max-w-[150px] text-base max-md:hidden">
              {user.username}
            </span>
          </Button>
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
