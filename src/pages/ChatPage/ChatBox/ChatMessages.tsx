import DistilledAIIcon from "@components/Icons/DistilledAIIcon"
import { useMemo } from "react"
import { Virtuoso } from "react-virtuoso"

const ChatMessages = () => {
  const messages = useMemo(() => {
    return Array.from({ length: 100 }, (_, index) => {
      return {
        bot: {
          id: index,
          role: "bot",
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere deleniti ex vero, voluptas sunt, omnis voluptate inventore eum eos earum tempora quaerat culpa, nemo maxime odit. Sapiente saepe dolore aliquam.",
        },
        user: {
          id: index + 1,
          role: "user",
          message: "I want to find a gift for girl friend",
        },
      }
    })
  }, [])

  return (
    <div className="h-full flex-1 rounded-[22px] border border-white bg-mercury-30 py-6">
      <Virtuoso
        data={messages}
        itemContent={(index, message) => (
          <article className="px-6" key={index}>
            {message.bot.role === "bot" ? (
              <div className="mb-4 flex items-center gap-4">
                <DistilledAIIcon />{" "}
                <p className="text-base-m flex-1">{message.bot.message}</p>
              </div>
            ) : null}
            {message.user.role === "user" ? (
              <div className="mb-4 ml-auto flex min-h-11 w-fit items-center rounded-full bg-mercury-950 px-4">
                <p className="text-base-m text-mercury-30">
                  {message.user.message}
                </p>
              </div>
            ) : null}
          </article>
        )}
      />
    </div>
  )
}

export default ChatMessages
