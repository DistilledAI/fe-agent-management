import AvatarCustom from "@components/AvatarCustom"

const MessageLive = () => {
  return (
    <div className="flex gap-4">
      <div>
        <AvatarCustom src={undefined} publicAddress="asdasdasdadaadasdas" />
      </div>
      <div className="flex flex-col">
        <span className="text-base-b">Thomas</span>
        <span className="text-base italic text-mercury-900">
          Ethereum? Forget it. It’s overhyped, centralized, and they keep
          changing the rules.
        </span>
      </div>
    </div>
  )
}

export default MessageLive
