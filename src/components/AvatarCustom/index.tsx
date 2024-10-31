import { Badge } from "@nextui-org/react"
import { renderIcon } from "@utils/index"
import React, { ReactNode, useEffect, useRef } from "react"
import { twMerge } from "tailwind-merge"

export interface AvatarCustomProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  badgeIcon?: string | ReactNode
  className?: string
  badgeClassName?: string
  badgeBaseClassName?: string
  icon?: React.ReactNode
  publicAddress?: string
  scalePoint?: number
}

const AvatarCustom: React.FC<AvatarCustomProps> = ({
  badgeIcon,
  className,
  badgeClassName,
  badgeBaseClassName,
  scalePoint,
  src,
  icon,
  publicAddress = "",
  ...props
}) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!src && publicAddress && canvasRef.current) {
      const canvas = canvasRef.current
      renderIcon(
        { seed: publicAddress?.toLowerCase(), scale: scalePoint, size: 10 },
        canvas,
      )
      const dataUrl = canvas?.toDataURL()
      if (dataUrl && imageRef.current) {
        imageRef.current.src = dataUrl
      }
    }
  }, [src, scalePoint, publicAddress])

  if (badgeIcon) {
    return (
      <Badge
        content={badgeIcon}
        placement="bottom-right"
        variant="solid"
        isOneChar
        classNames={{
          base: twMerge("h-fit", badgeBaseClassName),
          badge: twMerge(
            "min-w-[18px] min-h-[18px] w-[18px] h-[18px] right-[15%] bottom-[15%] z-1",
            badgeClassName,
          ),
        }}
        showOutline={false}
      >
        <div
          className={twMerge(
            "h-10 w-10 overflow-hidden rounded-full border-1 border-mercury-400 bg-mercury-100",
            className,
          )}
        >
          <canvas ref={canvasRef} style={{ display: "none" }} />
          {icon ? (
            <div className="flex h-full w-full items-center justify-center">
              {icon}
            </div>
          ) : (
            <img
              className="h-full w-full object-cover"
              loading="lazy"
              ref={imageRef}
              src={src}
              {...props}
            />
          )}
        </div>
      </Badge>
    )
  }

  return (
    <div
      className={twMerge(
        "h-10 w-10 overflow-hidden rounded-full border-1 border-mercury-400 bg-mercury-100",
        className,
      )}
    >
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {icon ? (
        <div className="flex h-full w-full items-center justify-center">
          {icon}
        </div>
      ) : (
        <img
          className="h-full w-full object-cover"
          loading="lazy"
          ref={imageRef}
          src={src}
          {...props}
        />
      )}
    </div>
  )
}
export default AvatarCustom
