import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { MarketplaceIcon } from "@components/Icons/Marketplace"
import { MessageIcon } from "@components/Icons/Message"
import { PATH_NAMES } from "@constants/index"
import { Link, useLocation } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const NAV_MOBILE = [
  {
    key: "1",
    url: PATH_NAMES.HOME,
    name: "Chats",
    icon: (color?: string) => <MessageIcon color={color} />,
  },
  {
    key: "2",
    url: PATH_NAMES.MARKETPLACE,
    name: "Marketplace",
    icon: (color?: string) => <MarketplaceIcon color={color} />,
  },
  {
    key: "3",
    url: PATH_NAMES.PRIVATE_AGENT,
    name: "Private Agent",
    icon: (color?: string) => <FilledBrainAIIcon color={color} />,
  },
]

const FooterMobile = () => {
  const { pathname } = useLocation()
  const isActive = (path: string) => {
    return pathname.includes(path)
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-[60px] w-full items-center justify-around bg-white px-4">
      {NAV_MOBILE.map((menu) => (
        <div key={menu.key}>
          <Link
            className={twMerge(
              "flex flex-col items-center font-medium text-mercury-400 duration-300",
              isActive(menu.url) && "text-mercury-950",
            )}
            to={menu.url}
          >
            <div
              className={twMerge(
                "rounded-full px-[14px] py-[3px] duration-300",
                isActive(menu.url) ? "bg-mercury-100" : "bg-white",
              )}
            >
              {menu.icon(isActive(menu.url) ? "#363636" : "#ADADAD")}
            </div>
            <span className="text-13">{menu.name}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default FooterMobile
