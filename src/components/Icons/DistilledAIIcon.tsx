import { distilledAIIcon } from "@assets/svg";
import { Image } from "@nextui-org/react";

const DistilledAIIcon = () => {
  return (
    <div className="border-mercury-400 flex h-8 w-8 items-center justify-center rounded-full border">
      <Image src={distilledAIIcon} alt="distilled AI icon" />
    </div>
  );
};

export default DistilledAIIcon;
