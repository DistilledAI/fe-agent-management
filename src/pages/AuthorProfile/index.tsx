import AvatarCustom from "@components/AvatarCustom"

import { Skeleton } from "@nextui-org/react"
import ShareAgent from "@pages/ChatPage/ChatBox/UserAuth/AccountSetting/Agent/ShareAgent"
import PrivateAgents from "@pages/Marketplace/AIAGents"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getUserPublicDetail } from "services/user"
import { twMerge } from "tailwind-merge"
import BackButton from "./BackButton"

const AuthorProfile = () => {
  const { authorId } = useParams()

  const authorDetail = {
    queryKey: ["user-public-detail", authorId],
    queryFn: () => getUserPublicDetail(Number(authorId)),
    enabled: !!authorId,
    staleTime: 60 * 60 * 1000,
  }

  const { data, isFetched } = useQuery(authorDetail)
  const authorInfo = data?.data

  return (
    <>
      <BackButton />
      <div className="space-y-2">
        <div className="bg-lgd-muted-beige w-full px-4 py-3">
          <div className="mx-auto flex w-full max-w-[768px] flex-wrap gap-x-4">
            <div className="flex flex-1 items-center gap-x-4">
              <Skeleton isLoaded={isFetched} className="rounded-full">
                <AvatarCustom
                  publicAddress={authorInfo?.publicAddress}
                  src={authorInfo?.avatar}
                />
              </Skeleton>
              <div>
                <Skeleton isLoaded={isFetched} className="rounded">
                  <h3 className="text-24 font-semibold text-mercury-950">
                    {authorInfo?.username || "Anonymous"}
                  </h3>
                </Skeleton>
                <Skeleton
                  isLoaded={isFetched}
                  className={twMerge("rounded", !isFetched && "mt-1")}
                >
                  <p className="text-16 font-medium text-mercury-900">
                    {authorInfo?.description || "-"}
                  </p>
                </Skeleton>
              </div>
            </div>
            <div className="max-md:mt-2 max-md:w-full">
              <ShareAgent agentData={authorInfo} />
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[768px] space-y-3 md:py-6">
          <h4 className="mx-4 space-x-2 text-18 text-mercury-900">
            <span className="font-semibold text-brown-10">0</span>
            <span>Public AI Agents</span>
          </h4>

          <div className="flex min-h-[200px] items-center justify-center rounded-[22px] bg-mercury-30 p-4 text-16">
            No AI Agents
          </div>

          <div className="space-y-3 pb-20 pt-10">
            <h4 className="mx-4 space-x-2 text-18 font-semibold text-mercury-900">
              AI Agents Marketplace Suggestions
            </h4>
            <div className="grid min-h-[200px] grid-cols-1 gap-y-6 rounded-[22px] bg-mercury-30 p-4 md:grid-cols-2 md:gap-x-20">
              <PrivateAgents />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthorProfile
