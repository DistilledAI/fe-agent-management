import { Button } from "@nextui-org/react"
import { Link } from "react-router-dom"

interface Props {
  content?: string
  link?: string
  icon: React.ReactNode | string
  isDisabled?: boolean
}

const SocialButton = ({ content, link, icon, isDisabled }: Props) => {
  return (
    <Button
      as={Link}
      to={link}
      isDisabled={isDisabled}
      target="_blank"
      className="h-14 w-full rounded-full bg-mercury-70 text-white md:h-10"
    >
      {typeof icon === "string" ? <img src={icon} /> : icon}
      {content ? (
        <span className="text-base text-mercury-900">{content}</span>
      ) : null}
    </Button>
  )
}

export default SocialButton
