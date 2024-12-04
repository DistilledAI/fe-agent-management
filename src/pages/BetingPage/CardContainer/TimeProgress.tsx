import { formatCountdownTime, useCountdown } from "@hooks/useCountdown"

const TimeProgress: React.FC<{
  startTime: any
  endTime: any
}> = ({ startTime, endTime }) => {
  const dateNow = new Date(startTime)
  const fiveMinutesLaterDate = new Date(endTime).getTime()

  const { timeRemaining } = useCountdown({
    startTime: Math.floor(dateNow.getTime()),
    endTime: Math.floor(fiveMinutesLaterDate),
    onStart: () => console.log("started"),
    onEnd: () => console.log("ended"),
  })

  const { minutes, seconds } = formatCountdownTime(timeRemaining)
  const bondingCurvePercent = 10

  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      <div className="w-full rounded-[28px] bg-[#1A1C28] p-[2px]">
        <div
          className="h-2 rounded-[999px] bg-[#FCFCFC]"
          style={{ width: `${bondingCurvePercent}%` }}
        />
      </div>
      <div className="text-12 font-medium text-[#E8E9EE]">
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  )
}
export default TimeProgress
