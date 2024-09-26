import { arrowUpCircleIcon } from "@assets/svg"
import { useAppSelector } from "@hooks/useAppRedux"
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form"

const suggestionList = [
  {
    name: "Give me alphas",
    desc: "most gained this week, trending on social",
  },
  {
    name: "What is ORAI?",
    desc: "give info about market cap rank & circulating supply",
  },
  {
    name: "How is Orai token performing recently?",
    desc: "current price & price change % 24h",
  },
  {
    name: "What assets in the top 5 are performing the best this week?",
    desc: "according to market trends & positive performance",
  },
]

const SuggesionList = ({
  onChatMsgSubmit,
}: {
  onChatMsgSubmit: SubmitHandler<FieldValues>
}) => {
  const isChatBox = useAppSelector((state) => state.chatBox.isChatBox)
  const { setValue, handleSubmit } = useFormContext()

  return !isChatBox ? (
    <div className="grid grid-cols-2 gap-3 max-xl:px-2">
      {suggestionList.map((suggest, index) => (
        <section
          className="group flex min-h-[85px] flex-1 cursor-pointer items-center justify-between rounded-[20px] bg-gray-light-blue dark:bg-neutral-title p-2 transition-all duration-300 ease-linear hover:bg-gray-pale-blue xl:px-3 xl:py-2"
          key={index}
          onClick={() => {
            setValue("message", suggest.name)
            handleSubmit(onChatMsgSubmit)()
          }}
        >
          <div>
            <h5 className="text-1 text-14 font-semibold xl:text-16 dark:text-neutral-suface">
              {suggest.name}
            </h5>
            <p className="text-14 text-gray-neutral dark:text-neutral-body_dark">{suggest.desc}</p>
          </div>

          <img
            src={arrowUpCircleIcon}
            alt=""
            className="opacity-0 transition-opacity duration-300 ease-linear group-hover:opacity-100"
          />
        </section>
      ))}
    </div>
  ) : null
}

export default SuggesionList
