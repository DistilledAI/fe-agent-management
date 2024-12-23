import AvatarCustom from "@components/AvatarCustom"
import { CopyIcon } from "@components/Icons/Copy"
import { LogoutIcon } from "@components/Icons/OutputIcon"
import useAuthAction from "@hooks/useAuthAction"
import useAuthState from "@hooks/useAuthState"
import { Tabs, Tab } from "@nextui-org/react"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import LockToken from "./LockToken"
import AddToken from "./AddToken"

const HomeContent = () => {
  const { user, isAnonymous, isLogin } = useAuthState()
  const isConnectWallet = isLogin && !isAnonymous
  const { logout } = useAuthAction()

  return (
    <div className="mx-auto max-w-[1232px] px-4 py-10">
      {isConnectWallet && (
        <div className="flex items-center gap-2">
          <AvatarCustom
            publicAddress={user.publicAddress}
            src={user.avatar}
            className="h-8 w-8"
          />
          <p className="font-medium">
            {centerTextEllipsis(user.publicAddress)}
          </p>
          <div
            className="cursor-pointer"
            onClick={(e) => copyClipboard(e, user.publicAddress)}
          >
            <CopyIcon />
          </div>
          <div onClick={logout} className="cursor-pointer">
            <LogoutIcon color="red" />
          </div>
        </div>
      )}
      <div className="mt-10">
        <Tabs
          classNames={{ tabContent: "font-medium text-15" }}
          aria-label="Options"
        >
          <Tab key="add-whitelist" title="Add Whitelist">
            <AddToken />
          </Tab>
          <Tab key="lock-token" title="Lock Token">
            <LockToken />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default HomeContent
