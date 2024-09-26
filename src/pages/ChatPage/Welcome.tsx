import { googleIcon } from "@assets/icons";
import { Button, Image } from "@nextui-org/react";

const Welcome = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-[1024px] gap-[88px] rounded-[32px] border border-mercury-100 bg-[#E8EAEC] p-16">
        <div>
          <h2 className="text-32 text-mercury-900">Welcome to</h2>
          <h2 className="text-56 font-semibold text-mercury-950">
            Distilled AI
          </h2>
        </div>
        <div className="h-[297px] w-[1px] bg-mercury-300" />
        <div className="py-[54.5px]">
          <h3 className="mb-6 text-24 text-mercury-900">
            Create your{" "}
            <span className="font-semibold">Private Intelligence</span>
          </h3>
          <Button className="mb-4 h-14 w-full rounded-full bg-mercury-950 text-18 text-mercury-30">
            Sign Up Now
          </Button>
          <Button className="h-14 w-full rounded-full bg-white text-18 text-mercury-900">
            <Image src={googleIcon} alt="google icon" />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
