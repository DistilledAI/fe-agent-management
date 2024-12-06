import { TimerIcon } from "@components/Icons"
import { formatCountdownTime, useCountdown } from "@hooks/useCountdown"

const HeaderTime = () => {
  const { timeRemaining } = useCountdown({
    startTime: Math.floor(1733330526),
    endTime: Math.floor(1733334126),
    onStart: () => console.log("HeaderTime-started"),
    onEnd: () => console.log("HeaderTime-ended"),
  })

  const { minutes, seconds } = formatCountdownTime(timeRemaining)

  return (
    <div>
      <div
        style={{
          boxShadow: "0px -2px 0px 0px rgba(255, 255, 255, 0.08) inset",
        }}
        className="flex items-center rounded-lg bg-[#13141D] px-3 py-2"
      >
        <TimerIcon />
        <div className="w-[85px] text-center font-medium text-[#F3F4F6]">
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
          {` `}(5m)
        </div>
      </div>
    </div>
  )
}

export default HeaderTime
