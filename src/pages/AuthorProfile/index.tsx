import AvatarCustom from "@components/AvatarCustom"

import ShareAgent from "@pages/ChatPage/ChatBox/UserAuth/AccountSetting/Agent/ShareAgent"
import PrivateAgents from "@pages/Marketplace/PrivateAgents"

const AuthorProfile = () => {
  return (
    <div className="space-y-2">
      <div className="bg-lgd-muted-beige w-full py-3">
        <div className="mx-auto flex max-w-[768px] gap-x-4">
          <div className="flex flex-1 items-center gap-x-4">
            <AvatarCustom publicAddress="1" />
            <div>
              <h3 className="text-24 font-semibold text-mercury-950">
                Anonymous
              </h3>
              <p className="text-16 font-medium text-mercury-900">
                What's Poppin
              </p>
            </div>
          </div>
          <div>
            <ShareAgent
              isDisabled
              agentData={{
                id: 0,
                createdAt: "",
                publicAddress: "",
                role: -1,
                status: -1,
                typeLogin: "",
                username: "",
              }}
            />
          </div>
        </div>
      </div>

      {/* Fake private agents of marketplace */}
      <div className="mx-auto max-w-[768px] space-y-3 py-6">
        <h4 className="space-x-2 text-18 text-mercury-900">
          <span className="font-semibold text-brown-10">4</span>
          <span>Public agent</span>
        </h4>

        <div className="grid grid-cols-2 gap-x-20 gap-y-6 rounded-[22px] bg-mercury-30 p-4">
          <PrivateAgents />
        </div>
      </div>
    </div>
  )
}

export default AuthorProfile
