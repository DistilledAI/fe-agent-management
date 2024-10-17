import {
  fyiPrivateDataBg,
  fyiPrivateDataBgMobile,
  fyiPrivateDataImage,
  fyiPrivateDataImageMobile,
} from "@assets/images"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import useWindowSize from "@hooks/useWindowSize"
import { Button, Modal, ModalContent } from "@nextui-org/react"
import { useEffect, useState } from "react"

const FYIModal: React.FC<{ openPopup: boolean; setOpenPopup: any }> = ({
  openPopup,
  setOpenPopup,
}) => {
  const { isMobile } = useWindowSize()
  const [counter, setCounter] = useState<number>(10)
  const onOpenChange = () => {
    setOpenPopup(!openPopup)
    setCounter(10)
  }

  const handleAnimation = () => {
    if (openPopup && counter < 100) {
      setTimeout(() => setCounter(counter + 10), 20)
    }
  }

  useEffect(() => {
    handleAnimation()
  }, [counter, openPopup])

  return (
    <Modal
      isOpen={openPopup}
      onOpenChange={onOpenChange}
      hideCloseButton
      classNames={{
        base: "bg-white max-sm:!m-0 max-sm:h-[calc(100vh-120px)]",
      }}
      size="2xl"
    >
      <ModalContent>
        <div className="max-sm:h-full relative mt-4 h-[600px] w-auto">
          <img
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
            src={isMobile ? fyiPrivateDataBgMobile : fyiPrivateDataBg}
            width={`${counter}%`}
          />

          <div className="flex-items-center justify-end px-4">
            <div className="z-50 cursor-pointer" onClick={onOpenChange}>
              <CloseFilledIcon />
            </div>
          </div>

          <div className="max-sm:top-[450px] absolute left-1/2 top-1/2 z-40 h-full w-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out">
            <img
              src={isMobile ? fyiPrivateDataImageMobile : fyiPrivateDataImage}
            />
          </div>

          {isMobile && (
            <Button
              className="absolute bottom-[40px] left-1/2 z-[200] h-[48px] w-[calc(100%-32px)] -translate-x-1/2 rounded-full bg-mercury-950 text-white"
              size="lg"
              onClick={onOpenChange}
            >
              Close
            </Button>
          )}
        </div>
      </ModalContent>
    </Modal>
  )
}
export default FYIModal
