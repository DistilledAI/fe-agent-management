import LoginButton from "@components/LoginButton"
import ThemeSwitcher from "./ThemeSwitcher"
import UserInfoCard from "./UserInfoCard"

const Header: React.FC = () => {
  return (
    <header className="flex w-full justify-between p-2 pb-0 max-xl:pl-0 xl:p-6">
      <div className="flex items-center justify-center gap-3">
        <ThemeSwitcher isButton />
        <LoginButton />
        <UserInfoCard />
      </div>
    </header>
  )
}
export default Header
