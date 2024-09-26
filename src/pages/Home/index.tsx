import {
  comingSoonImg,
  defiLensBg,
  defiLensDarkBg,
  llmChatbotFeatDarkImg,
  llmChatbotFeatImg,
} from "@assets/images"
import Header from "@components/Header"
import { IconLLMChatbot } from "@components/Icons/Home"
import { PATHS_NAME } from "@constants/index"
import useColorByTheme from "@hooks/useColorByTheme"
import { Button, useDisclosure } from "@nextui-org/react"
import { defineElement } from "@utils/index"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import LoginModal from "./LoginModal"

const llmFeatures = [
  {
    iconTitle: IconLLMChatbot,
    title: "LLM Chatbot",
    imgUrl: llmChatbotFeatImg,
    imgUrlDark: llmChatbotFeatDarkImg,
    path: PATHS_NAME.LLM,
    active: true,
  },
]

const Home = () => {
  const { isOpen, onOpenChange } = useDisclosure()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const error = searchParams.get("error")
  const errorDescription = searchParams.get("error_description")

  const showErrorMessage = () => {
    if (error && errorDescription) {
      return toast.error(errorDescription)
    }
  }

  useEffect(() => {
    showErrorMessage()
  }, [error, errorDescription])

  const handleTryNow = (path: string) => {
    // if (!isAuthenticated && !accessToken) {
    //   return onOpen()
    // }
    navigate(path)
  }
  const { isLightTheme } = useColorByTheme()

  return (
    <>
      <div
        className="h-[100dvh] w-[100dvw] overflow-y-auto bg-cover bg-no-repeat transition-all duration-500 ease-linear"
        style={{
          backgroundImage: `${
            isLightTheme ? `url(${defiLensBg})` : `url(${defiLensDarkBg})`
          }`,
        }}
      >
        <Header />
        <div className="mx-auto my-4 grid h-auto w-full max-w-[1088px] grid-cols-1 items-center justify-center gap-4 max-xl:p-2 max-lg:px-4 lg:grid-cols-2 lg:gap-6">
          {llmFeatures.map((feat, index) => (
            <div
              className="relative h-fit rounded-3xl bg-[#F8F8F8] p-4 dark:bg-black-bg_card lg:px-10 lg:py-6"
              key={index}
            >
              <div className="flex items-center gap-2">
                {defineElement(feat.iconTitle, {
                  color: `${isLightTheme ? "#232125" : "#FBFBFB"}`,
                })}
                <h2 className="text-16 font-bold dark:text-neutral-suface lg:text-24">
                  {feat.title}
                </h2>
              </div>
              <img
                src={isLightTheme ? feat.imgUrl : feat.imgUrlDark}
                className="rounded-3xl object-contain lg:h-[431px]"
              />
              <Button
                isDisabled={!feat.active}
                className="btn-primary w-full rounded-full"
                onClick={() => handleTryNow(feat.path)}
              >
                Try Now
              </Button>
              <img
                aria-hidden={feat.active}
                src={comingSoonImg}
                className="absolute -right-2 top-5 w-[145px] aria-hidden:hidden"
              />
            </div>
          ))}
        </div>
      </div>
      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}

export default Home
