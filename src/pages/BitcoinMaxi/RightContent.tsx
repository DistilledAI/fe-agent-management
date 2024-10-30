import AvatarCustom from "@components/AvatarCustom"

const RightContent: React.FC = () => {
  return (
    <div className="flex-1">
      <div className="flex gap-4">
        <AvatarCustom src={"assets/svg/user.svg"} />
        <div className="flex flex-col">
          <span className="text-base-b">Thuongdo</span>
          <span className="text-base italic text-mercury-900">
            Ethereum? Forget it. It’s overhyped, centralized, and they keep
            changing the rules.
          </span>
        </div>
      </div>
    </div>
  )
}
export default RightContent
