import { IconSun, IconTuneThemeMode } from "@components/Icons/Home"
import { THEME } from "@constants/defiLens"
import useColorByTheme from "@hooks/useColorByTheme"
import { Switch } from "@nextui-org/react"
import { useTheme } from "next-themes"

const ThemeSwitcher: React.FC<{ isButton?: boolean }> = ({ isButton }) => {
  const { setTheme } = useTheme()
  const { isLightTheme } = useColorByTheme()

  const handleChangeTheme = () => {
    if (isLightTheme) setTheme(THEME.DARK)
    else setTheme(THEME.LIGHT)
  }
  if (isButton) {
    return (
      <div
        className={`hover:cursor-pointe flex h-12 w-12 items-center justify-center rounded-full px-2 py-3 ${
          isLightTheme ? "bg-gray-30" : "bg-neutral-title"
        }`}
        onClick={handleChangeTheme}
      >
        {isLightTheme ? <IconTuneThemeMode /> : <IconSun />}
      </div>
    )
  }

  return (
    <div className="mt-3 flex items-center justify-between">
      <div className=" flex items-center gap-2">
        {isLightTheme ? <IconTuneThemeMode /> : <IconSun />}
        <span className="text-14 font-600 dark:text-neutral-suface">
          Dark Mode
        </span>
      </div>
      <div>
        <Switch
          size="sm"
          isSelected={!isLightTheme}
          onValueChange={handleChangeTheme}
          color="success"
        />
      </div>
    </div>
  )
}

export default ThemeSwitcher
