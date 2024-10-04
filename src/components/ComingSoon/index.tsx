import { ReactElement } from "react"

const ComingSoon: React.FC<{
  children?: ReactElement | string
  content?: ReactElement | string
  position?: "right" | "top"
}> = ({ children, content = "Coming Soon", position = "top" }) => {
  return (
    <div className="group relative z-[1] w-full">
      {position === "top" ? (
        <div
          style={{ boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.2)" }}
          className="invisible absolute bottom-[calc(100%+8px)] left-1/2 min-w-28 -translate-x-1/2 whitespace-nowrap rounded-[12px] bg-mercury-950 px-3 py-2 text-white opacity-0 duration-300 group-hover:visible group-hover:opacity-100"
        >
          <div className="absolute -bottom-[6px] left-1/2 z-[-1] h-0 w-0 -translate-x-1/2 border-l-[10px] border-r-[10px] border-t-[10px] border-transparent border-t-mercury-950"></div>
          {content}
        </div>
      ) : (
        <div
          style={{ boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.2)" }}
          className="invisible absolute left-[calc(100%+8px)] top-1/2 min-w-28 -translate-y-1/2 whitespace-nowrap rounded-[12px] bg-mercury-950 px-3 py-2 text-white opacity-0 duration-300 group-hover:visible group-hover:opacity-100"
        >
          <div className="absolute -left-[6px] top-1/2 z-[-1] h-0 w-0 -translate-y-1/2 border-b-[10px] border-r-[10px] border-t-[10px] border-transparent border-r-mercury-950"></div>
          {content}
        </div>
      )}
      <div className="pointer-events-none">{children}</div>
    </div>
  )
}

export default ComingSoon
