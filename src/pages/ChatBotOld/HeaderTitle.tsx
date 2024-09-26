import { messagesFilledIcon, messagesFilledIconDark } from "@assets/svg"
import OraichainLogo from "@components/OraichainLogo"
import { useAppSelector } from "@hooks/useAppRedux"
import useColorByTheme from "@hooks/useColorByTheme"

const HeaderTitle = () => {
  const isChatBox = useAppSelector((state) => state.chatBox.isChatBox)
  const { isLightTheme } = useColorByTheme()

  return !isChatBox ? (
    <section aria-expanded className="flex flex-col items-center xl:mt-16">
      <OraichainLogo
        logoUrl={isLightTheme ? messagesFilledIcon : messagesFilledIconDark}
      />

      <div className="relative">
        <h1 className="mt-4 max-w-[575px] text-center text-28 font-semibold dark:text-neutral-suface xl:text-44 xl:leading-[58px]">
          <span className="inline-block w-fit bg-green-light-lime px-1 text-28 font-semibold leading-none dark:text-[#121511] xl:text-44">
            DeFi
          </span>{" "}
          made easy and efficient with natural language{" "}
        </h1>
      </div>
    </section>
  ) : null
}

export default HeaderTitle
