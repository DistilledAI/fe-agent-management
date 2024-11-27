import { BoltIcon } from "@components/Icons"
import { useRef, useState, useEffect } from "react"

const ProgressDays = ({ progress = 50 }) => {
  const pathRef = useRef<any>(null)
  const [totalLength, setTotalLength] = useState(0)

  useEffect(() => {
    if (pathRef.current) {
      setTotalLength(pathRef.current.getTotalLength())
    }
  }, [])

  const dashOffset = totalLength - (progress / 100) * totalLength

  return (
    <div
      className="progress-wrapper"
      style={{
        position: "relative",
        width: "380px",
        height: "33px",
        margin: "24px auto",
      }}
    >
      <div className="absolute -top-8 left-1/2 flex -translate-x-1/2 items-center gap-1">
        <BoltIcon />
        <span className="text-14 text-mercury-950">5/7 days</span>
      </div>
      {/* Background Path */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="380"
        height="33"
        viewBox="0 0 380 33"
        fill="none"
      >
        <path
          d="M0 30.8243C50.865 12.9446 117.85 2 190 2C262.15 2 329.135 12.9446 380 30.8243"
          stroke="#DFDFDF"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Solid Progress Path */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="380"
        height="33"
        viewBox="0 0 380 33"
        fill="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1, // Solid progress dưới cùng
        }}
      >
        <g filter="url(#progressFilter)">
          <path
            ref={pathRef}
            d="M0 30.8243C50.865 12.9446 117.85 2 190 2C262.15 2 329.135 12.9446 380 30.8243"
            stroke="#6B50B5"
            strokeWidth="4"
            strokeDasharray={totalLength}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.5s ease",
            }}
          />
        </g>
        <defs>
          <filter
            id="progressFilter"
            x="-5"
            y="-5"
            width="390"
            height="43"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="2"
              floodColor="#6B50B5"
              floodOpacity="0.5"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}

export default ProgressDays
