import { AvatarClanByList } from "@components/AvatarContainer"
import { PlusIcon } from "@components/Icons/Plus"
import React from "react"
import { IGroupDetail } from "types/group"

const ClanItem: React.FC<{
  group: IGroupDetail
  isJoined?: boolean
}> = ({ isJoined = false, group }) => {
  return (
    <div className="relative cursor-pointer duration-300 hover:opacity-80">
      <AvatarClanByList
        name={group.name}
        publicAddress={group.name}
        avatarUrl={group.image || undefined}
      />
      {!isJoined && (
        <div className="absolute right-[6px] top-[-4px] flex h-5 w-5 items-center justify-center rounded-full bg-white">
          <PlusIcon size={14} color="#545454" />
        </div>
      )}
    </div>
  )
}

export default ClanItem
