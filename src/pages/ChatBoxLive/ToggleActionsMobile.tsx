import { ArrowsBarToUpIcon } from "@components/Icons/Arrow"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { useQueries, useQueryClient } from "@tanstack/react-query"
import { twMerge } from "tailwind-merge"

const ToggleActionsMobile = () => {
  const queryClient = useQueryClient()
  const queries = useQueries({
    queries: [
      {
        queryKey: ["expand-live-chat"],
      },
      {
        queryKey: ["close-live-chat"],
      },
    ],
  })
  const isExpandLiveChat = !!queries[0].data
  const isCloseLiveChat = !!queries[1].data

  const handleExpandChatLive = (isExpand: boolean) => {
    queryClient.setQueryData<boolean>(["expand-live-chat"], () => isExpand)
    const chatWindow = document.getElementById("chat-window")
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight
      chatWindow.style.scrollBehavior = "smooth"
      setTimeout(() => {
        chatWindow.style.scrollBehavior = "auto"
      }, 1000)
    }
  }

  const handleCloseChatLive = (isClose: boolean) => {
    queryClient.setQueryData<boolean>(["close-live-chat"], () => isClose)
    handleExpandChatLive(false)
  }

  return (
    <div className="flex items-center justify-between border-b border-b-mercury-100 px-4 py-2 md:hidden">
      <h4 className="text-16 font-bold text-mercury-950">Live Chat</h4>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className={twMerge(
            "rounded-full p-[5.5px] hover:bg-mercury-30",
            isCloseLiveChat && "hidden",
            isExpandLiveChat && "rotate-180",
          )}
          onClick={() => handleExpandChatLive(!isExpandLiveChat)}
        >
          <ArrowsBarToUpIcon />
        </button>
        <button
          type="button"
          className={twMerge(
            "rounded-full p-[5.5px] hover:bg-mercury-30",
            isCloseLiveChat && "hidden",
          )}
          onClick={() => handleCloseChatLive(true)}
        >
          <CloseFilledIcon />
        </button>
        <button
          type="button"
          className={twMerge(
            "hidden rounded-full p-[5.5px] hover:bg-mercury-30",
            isCloseLiveChat && "block rotate-180",
          )}
          onClick={() => handleCloseChatLive(false)}
        >
          <ChevronDownIcon />
        </button>
      </div>
    </div>
  )
}

export default ToggleActionsMobile
