import { ChangeEvent, useState } from "react"

const RangeMultiSlider = () => {
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(100)
  const min: number = 0
  const max: number = 100
  const minThumb: number = ((minPrice - min) / (max - min)) * 100
  const maxThumb: number = 100 - ((maxPrice - min) / (max - min)) * 100

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value: number = parseInt(event.target.value)
    value = Math.min(value, maxPrice - 32)

    setMinPrice(value)
  }

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value: number = parseInt(event.target.value)
    value = Math.max(value, minPrice + 32)

    setMaxPrice(value)
  }

  return (
    <div className="relative">
      <input
        type="range"
        step="1"
        min={min}
        max={max}
        onChange={handleMinChange}
        value={minPrice}
        className="pointer-events-none absolute z-20 h-2 w-full cursor-pointer appearance-none opacity-0"
      />
      <input
        type="range"
        step="1"
        min={min}
        max={max}
        onChange={handleMaxChange}
        value={maxPrice}
        className="pointer-events-none absolute z-20 h-2 w-full cursor-pointer appearance-none opacity-0"
      />

      <div className="relative z-10 h-2">
        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 rounded-md  bg-[#D8D8D8]"></div>

        <div
          className="bg-gray-dark-slate absolute bottom-0 top-0 z-20 rounded-md"
          style={{ right: `${maxThumb}%`, left: `${minThumb}%` }}
        />

        <div
          className="absolute left-0 top-0 z-30 -ml-1 -mt-3 h-8 w-8 rounded-full border-[2px] border-[#DCDCDC] bg-white"
          style={{ left: `${minThumb}%` }}
        />

        <div
          className="absolute right-0 top-0 z-30 -mr-1 -mt-3 h-8 w-8 rounded-full border-[2px] border-[#DCDCDC] bg-white"
          style={{ right: `${maxThumb}%` }}
        />
      </div>
    </div>
  )
}

export default RangeMultiSlider
