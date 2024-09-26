import { DotCircleFilledIcon } from "@components/Icons/DotIcon";
import { Button } from "@nextui-org/react";

const ExAssistant = () => {
  return (
    <Button className="border-mercury-600 h-11 rounded-full border bg-mercury-100">
      <DotCircleFilledIcon />
      <span className="text-base-b">My Executive Assistant</span>
    </Button>
  );
};

export default ExAssistant;
