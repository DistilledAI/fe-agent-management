import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

interface DotLoadingProps {
  dotColor?: string
  className?: string
}

const DotLoading: React.FC<DotLoadingProps> = ({ dotColor, className }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleAnimation = () => {
    setTimeout(() => setLoading(!loading), 820)
  }

  useEffect(() => {
    handleAnimation()
  }, [loading])

  return (
    <div className={`flex-items-center relative w-8 ${className}`}>
      <div className="absolute left-1/2 -translate-x-1/2">
        <div
          className={twMerge(
            "h-3 w-3 rounded-full",
            dotColor ? `bg-[${dotColor}]` : "bg-mercury-600",
          )}
        />
      </div>

      <div
        className={twMerge(
          "relative transition-all duration-500 ease-out",
          loading ? "left-6" : "left-0",
        )}
      >
        <div
          className={twMerge(
            "h-[6px] w-[6px] rounded-full",
            dotColor ? `bg-[${dotColor}]` : "bg-mercury-600",
          )}
        />
      </div>
    </div>
  )
}
export default DotLoading
