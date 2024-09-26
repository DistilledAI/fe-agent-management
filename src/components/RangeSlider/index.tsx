import useColorByTheme from "@hooks/useColorByTheme"

const RangeSlider = ({
  onSliderChange,
  onMouseUp,
  value,
  max = 100,
  step = 1,
}: {
  onSliderChange: (value: number) => void
  onMouseUp?: () => void
  value: number
  max?: number
  step?: number
}) => {
  const progress = (value / max) * 100
  const { isLightTheme } = useColorByTheme()

  return (
    <input
      type="range"
      step={step}
      min={0}
      max={max}
      onChange={(event) => onSliderChange(Number(event.target.value))}
      style={{
        background: isLightTheme
          ? `linear-gradient(to right, #3A3A3A ${progress}%, #D8D8D8 ${progress}%)`
          : `linear-gradient(to right, #C6C8CE ${progress}%, #494949 ${progress}%)`,
      }}
      value={value}
      onMouseUp={onMouseUp}
      onTouchEnd={onMouseUp}
    />
  )
}

export default RangeSlider
