import AvatarCustom from "@components/AvatarCustom"
import { ShareWithQrIcon } from "@components/Icons/Share"
import {
  MAP_DISPLAY_FROM_STATUS_MY_AGENT,
  PATH_NAMES,
  STATUS_AGENT,
} from "@constants/index"
import useLoadMoreByScroll from "@hooks/useLoadMoreByScroll"
import React, { useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { IAgentData } from "types/user"
import ShareModal from "../Profile/ShareProfile/ShareModal"
import { useDisclosure } from "@nextui-org/react"
import MyAgentAction from "./Action"

const ListAgentMobile: React.FC<{
  data: IAgentData[]
  loadMore: () => void
  hasMore: boolean
}> = ({ data, loadMore, hasMore }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [agentSelected, setAgentSelected] = useState<number | null>(null)
  const isEmpty = data.length === 0
  const tableRef = useRef<any>(null)

  useLoadMoreByScroll(tableRef, loadMore, hasMore)
  const isPending = (status: number) => status === STATUS_AGENT.PENDING

  return (
    <>
      <div
        ref={tableRef}
        className="max-h-[300px] overflow-y-auto rounded-[22px] border-1 border-white bg-white p-4"
      >
        <div className="mb-2 w-full bg-white font-semibold">My Agents</div>
        {isEmpty ? (
          <span className="text-14 text-base text-mercury-600">Empty</span>
        ) : (
          data.map((item) => {
            return (
              <div className="border-b-1 border-mercury-100 py-2 first:pt-0 last:border-none last:pb-0">
                <div
                  style={{
                    color: MAP_DISPLAY_FROM_STATUS_MY_AGENT[item.status]?.color,
                  }}
                  className="mb-1 text-13"
                >
                  {MAP_DISPLAY_FROM_STATUS_MY_AGENT[item.status]?.label ??
                    "- - -"}
                </div>
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex gap-3">
                    <div>
                      <AvatarCustom
                        publicAddress={item.publicAddress || item.username}
                        className="h-6 w-6"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="line-clamp-1 max-w-[120px] font-bold text-mercury-950">
                          {item.username}
                        </p>
                        {!isPending(item.status) && (
                          <div
                            onClick={() => {
                              onOpen()
                              setAgentSelected(item.id)
                            }}
                            className={twMerge(
                              "cursor-pointer",
                              isPending(item.status)
                                ? "cursor-default opacity-70"
                                : "",
                            )}
                          >
                            <ShareWithQrIcon />
                          </div>
                        )}
                      </div>
                      <p className="line-clamp-1 text-13 text-mercury-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div>
                    <MyAgentAction data={item} />
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
      <ShareModal
        shareUrl={`${window.location.origin}${PATH_NAMES.INVITE}/${agentSelected}`}
        isOpen={isOpen && !!agentSelected}
        onClose={() => {
          onClose()
          setAgentSelected(null)
        }}
      />
    </>
  )
}

export default ListAgentMobile
