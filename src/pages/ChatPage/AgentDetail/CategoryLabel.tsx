import { twMerge } from "tailwind-merge"

interface LabelCustomProps {
  text: string
  icon: React.ReactNode
}

interface FieldLabelProps {
  text: string
  required?: boolean
  containerClassName?: string
}

const CategoryLabel: React.FC<LabelCustomProps> = ({ text, icon }) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-22 font-bold text-mercury-950">{text}</span>
    </div>
  )
}

export const FieldLabel: React.FC<FieldLabelProps> = ({
  text,
  required,
  containerClassName,
}) => {
  return (
    <div className={twMerge("mb-2", containerClassName)}>
      <span className="text-base-sb text-mercury-950">{text}</span>
      {required && (
        <span className="text-base-md ml-[2px] text-[#FF3B30]">*</span>
      )}
    </div>
  )
}

export const Divider = () => {
  return <div className="my-8 h-[1px] w-full bg-mercury-100" />
}

export default CategoryLabel
