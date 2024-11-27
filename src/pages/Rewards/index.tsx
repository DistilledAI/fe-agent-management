import { creditBg } from "@assets/images"
import { CopyIcon } from "@components/Icons/Copy"
import { QRCodeIcon } from "@components/Icons/QRCode"
import { Button } from "@nextui-org/react"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import { checkConnectDistilledX, getTaskSuccess } from "services/agent"

const Rewards: React.FC = () => {
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code")
  const isCalling = localStorage.getItem("isCalling")

  const callGetTaskSuccess = async () => {
    try {
      const res = await getTaskSuccess()
      console.log("🚀 ~ callGetTaskSuccess ~ res:", res)
    } catch (error) {}
  }

  useEffect(() => {
    callGetTaskSuccess()
  }, [])

  const onFollowTwitterNext = async () => {
    try {
      if (code) {
        const response = await checkConnectDistilledX({
          code,
          redirectUri: "http://localhost:5173/rewards",
        })
        if (response?.status === 201) {
          console.log("success")
          localStorage.removeItem("isCalling")
        }
        console.log("response", response)
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    if (isCalling && code) {
      onFollowTwitterNext()
    }
  }, [isCalling, code])

  const onFollowTwitter = async () => {
    window.open(
      "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=V2wzbzlWcDFWZGg2U0l5VkZqRHg6MTpjaQ&redirect_uri=http://localhost:5173/rewards&scope=follows.read+follows.write+offline.access+users.read+tweet.read+tweet.write+like.read+like.write&state=optionalState123&code_challenge=codeChallenge&code_challenge_method=plain",
    )
    localStorage.setItem("isCalling", "1")
    setTimeout(async () => {
      try {
        // const res = await getVerifyTwitter()
        // if (res?.data === "success") {
        //   doneMissions(res?.point)
        //   updateSocialsMission("twitter")
        // }
      } catch (e: any) {
        toast.error(
          e?.response?.data?.message ||
            "Something went wrong. Please try again!",
        )
      }
    }, 2000)
  }

  // const onJoinTelegram = () => {
  //   window.open("https://t.me/defi_lens", "_blank")
  //   setVerifying("telegram")
  //   setTimeout(async () => {
  //     try {
  //       setVerifying("")
  //       // const res = await getVerifyTelegram()
  //       // if (res?.data === "success") {
  //       //   doneMissions(res?.point)
  //       //   updateSocialsMission("telegram")
  //       // }
  //     } catch (e: any) {
  //       toast.error(
  //         e?.response?.data?.message ||
  //           "Something went wrong. Please try again!",
  //       )
  //     }
  //   }, 2000)
  // }

  return (
    <>
      <div className="sticky top-[50px] z-[11] flex items-center justify-center bg-lgd-muted-beige p-3 backdrop-blur-3xl max-sm:px-4 md:top-[68px]">
        <div className="flex w-full max-w-[800px] flex-wrap items-center justify-between px-4 max-sm:flex-col max-sm:items-start max-sm:px-0">
          <div className="flex flex-col">
            <span className="text-24 font-semibold text-mercury-950 max-sm:text-18">
              Mesh Rewards Hub
            </span>
            <span className="text-base font-medium text-mercury-500 max-sm:text-14">
              Earn xDSTL points by completing objectives and referring friends.
            </span>
          </div>
          <div className="flex gap-3 max-sm:mt-2 max-sm:flex-wrap max-sm:gap-1" />
        </div>
      </div>

      <div className="relative mx-auto max-w-[800px] px-4 pb-5 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[70px] max-sm:pb-20 max-sm:pt-6">
        <div className="mb-6 mt-[40px] flex flex-col">
          <span className="text-24 font-semibold text-mercury-950 max-sm:text-18">
            Share your code to Earn extra points!
          </span>
          <span className="text-base font-medium text-mercury-500 max-sm:text-14">
            Earn 1000 xDSTL per friend who joins and completes the
            <span className="font-bold text-brown-500">
              {" "}
              Welcome to Mesh
            </span>{" "}
            objective.
          </span>
        </div>

        <div
          style={{
            backgroundImage: `url(${creditBg})`,
          }}
          className="h-full w-[75%] rounded-[22px] border-1 bg-cover bg-center bg-no-repeat px-6 py-8"
        >
          <div className="mb-2 flex items-center justify-between leading-none">
            <span className="font-medium text-mercury-300">My Referred</span>
            <span className="text-[32px] font-bold text-white">2/10</span>
          </div>

          <div className="my-4 grid grid-cols-8 gap-3">
            <div className="col-span-6 flex items-center justify-between rounded-lg border-1 border-mercury-900 bg-[rgba(84,84,84,0.20)] px-3 py-2">
              <span className="text-base-md text-white">
                https://mesh.distilled.ai/?invite=123ABCxyz
              </span>
              <CopyIcon color="#FFFFFF" />
            </div>

            <Button className="col-span-2 w-full rounded-full !border !border-mercury-900 bg-[rgba(195,195,195,0.20)] text-[14px] font-medium text-white max-md:min-h-12 md:text-[16px]">
              <QRCodeIcon color="#FFFF" />
              <span className="text-base-md text-white">Share</span>
            </Button>
          </div>

          <div className="flex items-center justify-between leading-none">
            <span className="text-base-md text-mercury-600">You got:</span>
            <span className="text-base-md text-mercury-600">2000</span>
          </div>
        </div>

        <Button onClick={onFollowTwitter}>Follow twitter</Button>
      </div>
    </>
  )
}
export default Rewards
