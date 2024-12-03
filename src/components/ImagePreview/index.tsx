import { CloseFilledIcon } from "@components/Icons/DefiLens"
import React from "react"

const ViewFullMedia: React.FC<{
  isOpen: boolean
  onClose: () => void
  url: string
}> = ({ isOpen, onClose, url }) => {
  if (!isOpen) return <></>
  return (
    <div className="fixed left-0 top-0 !z-[10000] flex h-full w-full items-center">
      <div
        onClick={onClose}
        className="absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.7)]"
      />
      <img
        className="relative m-auto max-h-[calc(100vh-40px)] max-w-[calc(100vw-40px)] object-contain"
        alt="view"
        src={url}
      />
      <button
        type="button"
        className="absolute right-5 top-5 rounded-full bg-white p-2 sm:right-2 sm:top-2"
        onClick={onClose}
      >
        <CloseFilledIcon />
      </button>
    </div>
  )
}

export default ViewFullMedia
