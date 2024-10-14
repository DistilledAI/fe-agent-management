import { fluxAIEx, stableDiffusionAIEx } from "@assets/images"
import AvatarCustom from "@components/AvatarCustom"
import { MessageDots } from "@components/Icons/Message"
import { Button } from "@nextui-org/react"

const GEN_AI_TOOLS = [
  {
    name: "Flux",
    description: "Transforming text and images into stunning visuals",
    icon: fluxAIEx,
  },
  {
    name: "StableDiffusion",
    description: "The latest and most advanced text-to-image AI model",
    icon: stableDiffusionAIEx,
  },
]

const GenAITools = () => {
  return GEN_AI_TOOLS.map((item, index) => (
    <div
      className="flex justify-between gap-6 border-b border-b-mercury-70 py-2 last:border-none"
      key={index}
    >
      <div className="flex gap-4">
        <AvatarCustom badgeClassName="bg-yellow-10" src={item.icon} />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base-b line-clamp-1 text-mercury-800">
              {item.name}
            </span>
          </div>
          <p className="max-w-[187px] text-13 font-medium text-mercury-600">
            {item.description || "Distilled AI Agent"}
          </p>
        </div>
      </div>
      <Button className="min-w-[52px] rounded-full border border-mercury-50 bg-mercury-100 px-4 py-2">
        <MessageDots />
      </Button>
    </div>
  ))
}

export default GenAITools
