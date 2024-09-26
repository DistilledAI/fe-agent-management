import { twMerge } from "tailwind-merge"

interface Props {
  footerClassName?: string
}

const Footer: React.FC<Props> = ({ footerClassName }) => {
  return (
    <footer
      className={twMerge(
        "text-gray-dark-charcoal mb-4 text-center text-14 dark:text-[#909090]",
        footerClassName,
      )}
    >
      Disclaimer: Not financial advice. Check important information before
      execution.
    </footer>
  )
}

export default Footer
