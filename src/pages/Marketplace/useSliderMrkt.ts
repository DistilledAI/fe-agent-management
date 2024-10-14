import { useEffect, useRef, useState } from "react"

interface Props {
  isOpen: boolean
  itemsCount: number
}

const useSliderMrkt = ({ itemsCount, isOpen }: Props) => {
  const [slider, setSlider] = useState<number>(0)
  const touchStartXRef = useRef(0)
  const touchEndXRef = useRef(0)
  const mouseStartXRef = useRef(0)
  const mouseEndXRef = useRef(0)
  const isMouseDownRef = useRef(false)

  const onPrevSlider = () => {
    if (slider === 0) return
    setSlider((prevSlider) => prevSlider - 1)
  }

  const onNextSlider = () => {
    if (slider === itemsCount) return
    setSlider((prevSlider) => prevSlider + 1)
  }

  const handleTouchStart = (e: any) => {
    touchStartXRef.current = e.changedTouches[0].screenX
  }

  const handleTouchMove = (e: any) => {
    touchEndXRef.current = e.changedTouches[0].screenX
  }

  const handleTouchEnd = () => {
    if (touchStartXRef.current - touchEndXRef.current > 50) {
      onNextSlider()
    }

    if (touchEndXRef.current - touchStartXRef.current > 50) {
      onPrevSlider()
    }
  }

  // Mouse Event Handlers
  const handleMouseDown = (e: any) => {
    isMouseDownRef.current = true
    mouseStartXRef.current = e.screenX
    mouseEndXRef.current = e.screenX
  }

  const handleMouseMove = (e: any) => {
    if (!isMouseDownRef.current) return
    mouseEndXRef.current = e.screenX
  }

  const handleMouseUp = () => {
    if (!isMouseDownRef.current) return
    isMouseDownRef.current = false

    if (mouseStartXRef.current - mouseEndXRef.current > 50) {
      onNextSlider()
    }

    if (mouseEndXRef.current - mouseStartXRef.current > 50) {
      onPrevSlider()
    }
  }

  useEffect(() => {
    const sliderContainer = document.getElementById("slider-container")
    if (sliderContainer) {
      sliderContainer.addEventListener("touchstart", handleTouchStart)
      sliderContainer.addEventListener("touchmove", handleTouchMove)
      sliderContainer.addEventListener("touchend", handleTouchEnd)
      sliderContainer.addEventListener("touchstart", handleTouchStart)
      sliderContainer.addEventListener("touchmove", handleTouchMove)
      sliderContainer.addEventListener("touchend", handleTouchEnd)

      // Mouse Events
      sliderContainer.addEventListener("mousedown", handleMouseDown)
      sliderContainer.addEventListener("mousemove", handleMouseMove)
      sliderContainer.addEventListener("mouseup", handleMouseUp)
      sliderContainer.addEventListener("mouseleave", handleMouseUp)
    }

    return () => {
      if (sliderContainer) {
        sliderContainer.removeEventListener("touchstart", handleTouchStart)
        sliderContainer.removeEventListener("touchmove", handleTouchMove)
        sliderContainer.removeEventListener("touchend", handleTouchEnd)

        // Remove Mouse Events
        sliderContainer.removeEventListener("mousedown", handleMouseDown)
        sliderContainer.removeEventListener("mousemove", handleMouseMove)
        sliderContainer.removeEventListener("mouseup", handleMouseUp)
        sliderContainer.removeEventListener("mouseleave", handleMouseUp)
      }
    }
  }, [isOpen, slider])

  return {
    onPrevSlider,
    onNextSlider,
    setSlider,
    slider,
  }
}

export default useSliderMrkt
