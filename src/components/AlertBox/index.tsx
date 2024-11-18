import { InfoCircleIcon } from "@components/Icons/InfoCircleIcon"
import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

interface AlertBoxProps {
  isVisible?: boolean
  messages: ReactNode[]
  links?: { to: string; label: string; external?: boolean }[]
  className?: string
}

const AlertBox = ({
  isVisible = true,
  messages,
  links,
  className = "",
}: AlertBoxProps) => {
  if (!isVisible) return null

  return (
    <div
      className={twMerge(
        "flex flex-col justify-between gap-2 rounded-lg border border-brown-500 bg-brown-50 px-4 py-3 md:flex-row",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <InfoCircleIcon color="#83664B" size={16} />
        <div>
          {messages.map((message, index) => (
            <div key={index} className="text-16 font-medium text-brown-600">
              {message}
            </div>
          ))}
        </div>
      </div>
      {links && (
        <div className="flex gap-4 max-md:ml-[22px]">
          {links.map(({ to, label, external }) => (
            <Link
              key={label}
              to={to}
              target={external ? "_blank" : "_self"}
              className="text-16 font-bold text-brown-600 hover:underline"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default AlertBox
