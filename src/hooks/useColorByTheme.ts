import { THEME } from "@constants/defiLens"
import { useTheme } from "next-themes"

const useColorByTheme = () => {
  const { theme } = useTheme()
  const isLightTheme = theme === THEME.LIGHT

  return { isLightTheme }
}

export default useColorByTheme
