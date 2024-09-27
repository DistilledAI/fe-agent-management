import { ReactNode } from "react"

interface HugeButtonProps {
  icon: ReactNode
  label: string
  isDisable?: boolean
}

const HugeButton: React.FC<HugeButtonProps> = ({ icon, label, isDisable }) => {
  return (
    <div
      className="shadow-3 flex h-[145px] w-[145px] cursor-pointer flex-col items-center justify-center gap-2 rounded-full border border-mercury-300 bg-mercury-30 p-4 aria-selected:opacity-40"
      aria-selected={isDisable}
    >
      {icon}
      <div className="text-base-b text-center">{label}</div>
    </div>
  )
}
export default HugeButton
