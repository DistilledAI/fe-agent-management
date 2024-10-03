import { Button } from "@nextui-org/react"

const MyCredits = () => {
  return (
    <div
      style={{
        background:
          "radial-gradient(102.52% 50% at 50% 50%, #383327 0%, #292929 100%)",
      }}
      className="border-800 rounded-[22px] border-1 p-8"
    >
      <div className="mb-6 flex items-center justify-between leading-none">
        <span className="font-medium text-mercury-300">My Credits</span>
        <span className="text-[40px] font-semibold text-white">0</span>
      </div>
      <div className="mb-6 flex items-center justify-between leading-none">
        <span className="font-medium text-mercury-600">Balance:</span>
        <span className="font-medium text-mercury-600">$0</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button className="rounded-full border-1 border-mercury-900 bg-[rgba(84,84,84,0.2)] font-medium text-white">
          Backup your account
        </Button>
        <Button className="rounded-full border-1 border-mercury-900 bg-[rgba(195,195,195,0.2)] font-medium text-white">
          Get more credits
        </Button>
      </div>
    </div>
  )
}

export default MyCredits
