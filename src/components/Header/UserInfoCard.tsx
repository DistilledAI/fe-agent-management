import { logoutIcon, userCircleAddIcon } from "@assets/svg"
import { useAuth0 } from "@auth0/auth0-react"
import useLogout from "@hooks/useLogout"
import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react"
// import { useEffect, useState } from "react"
// import { toast } from "react-toastify"
import TokenService from "services/token"
// import { getReferralCode } from "services/users"
import ThemeSwitcher from "./ThemeSwitcher"

const UserInfoCard: React.FC = () => {
  const userInfoLocal = TokenService.getUserLocal()
  const { isAuthenticated, user } = useAuth0()
  const userInfo = Object.keys(userInfoLocal)?.length > 0 ? userInfoLocal : user
  const uerInfo = TokenService.getUserLocal()
  const accessToken = uerInfo?.token?.accessToken
  const handleLogout = useLogout()
  // const [isOpen, setIsOpen] = useState<boolean>(false)
  // const [referralInfo, setReferralInfo] = useState<any>(null)

  // useEffect(() => {
  //   const callGetReferralCode = async () => {
  //     try {
  //       const res = await getReferralCode()
  //       if (res?.data) {
  //         setReferralInfo(res.data)
  //       }
  //     } catch (error) {
  //       console.log("error", error)
  //     }
  //   }

  //   if (isOpen) {
  //     callGetReferralCode()
  //   }
  // }, [isOpen])

  // const handleCopyCode = (referralCode: string) => {
  //   navigator.clipboard.writeText(referralCode)
  //   toast.success("Copy referral link successfully!")
  //

  if (accessToken || isAuthenticated) {
    return (
      <Popover
        placement="bottom"
        showArrow={false}
        size="lg"
        // onOpenChange={(isOpen) => setIsOpen(isOpen)}
      >
        <PopoverTrigger>
          <Avatar
            src={userInfo?.picture}
            isBordered
            className="cursor-pointer max-xl:h-8 max-xl:w-8"
          />
        </PopoverTrigger>
        <PopoverContent className="w-[250px] items-start dark:bg-neutral-title">
          <div className="w-full px-1 py-2">
            <div className="flex flex-col">
              <p className="font-bold dark:text-neutral-suface">
                {userInfo?.name}
              </p>
              <p className="text-12 text-neutral-text-body dark:text-neutral-body_dark lg:text-14">
                {userInfo?.email}
              </p>
            </div>
            <div className="my-4 h-[1px] w-full divide-y-2 bg-gray-30 dark:bg-[#494949]" />
            <div className=" my-1 w-full rounded-2xl bg-primary-subtle p-3 dark:bg-[#43612F]">
              <div className=" flex items-center gap-2">
                <img src={userCircleAddIcon} />
                <span className=" font-14 font-medium dark:text-[#F7F7F7]">
                  {/* Referrals: {referralInfo?.totalReferralUsed} */}
                  Referrals: 0
                </span>
              </div>
              <Button
                radius="full"
                fullWidth
                className=" mt-4 h-12 bg-primary-default !text-16 !font-600 dark:bg-[#9FE870] dark:text-[#121511]"
                // onClick={() =>
                //   handleCopyCode(
                //     `${window.location.origin}/?referredByCode=${referralInfo?.referralCode}`,
                //   )
                // }
                isDisabled
                // isLoading={!referralInfo}
              >
                {/* Copy referral link */}
                Coming soon
              </Button>
            </div>
            <ThemeSwitcher />
            <div className="my-4 h-[1px] w-full divide-y-2 bg-gray-30 dark:bg-[#494949]" />
            <Button
              radius="full"
              fullWidth
              className="h-12 bg-neutral-suface !text-16 !font-600 !text-neutral-error dark:bg-transparent"
              onClick={handleLogout}
            >
              <img src={logoutIcon} />
              <span className="!text-neutral-error">Log out</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return null
}
export default UserInfoCard
