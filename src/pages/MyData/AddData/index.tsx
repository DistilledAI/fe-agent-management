import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { DatabaseImportIcon } from "@components/Icons/DatabaseImportIcon"
import { EmailUpIcon } from "@components/Icons/EmailUpIcon"
import { FoldersIcon } from "@components/Icons/Folder"
import { PDFTypeIcon } from "@components/Icons/PDFTypeIcon"
import { PhotoPlusIcon } from "@components/Icons/PhotoPlusIcon"
import { SocialLinkIcon, ThreeDotsIcon } from "@components/Icons/SocialLinkIcon"
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react"
import CreatPrivateAgentModal from "@pages/ChatPage/ChatBox/RightContent/Modal/CreatPrivateAgentModal"
import { useState } from "react"

const DATA_METHOD_LIST = [
  {
    label: "PDFs",
    icon: <PDFTypeIcon color="#DFDFDF" size={20} />,
    key: "pdfs",
  },
  {
    label: "Emails",
    icon: <EmailUpIcon color="#DFDFDF" size={20} />,
    key: "emails",
  },
  {
    label: "Photos & Videos",
    icon: <PhotoPlusIcon color="#DFDFDF" size={20} />,
    key: "photo",
  },
  {
    label: "Website links (including Social Media)",
    icon: <SocialLinkIcon color="#363636" size={20} />,
    key: "link",
  },
]

const AddData = () => {
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleSelectOption = async (record: any) => {
    if (record.key === "link") {
      setOpenPopup(true)
      togglePopover()
    }
  }

  const togglePopover = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Popover placement="bottom" isOpen={isOpen}>
        <PopoverTrigger>
          <Button
            className="min-h-[44px] bg-mercury-950"
            radius="full"
            onClick={togglePopover}
          >
            <div className="flex-items-center gap-1">
              <FilledBrainAIIcon size={20} color="#FFFF" />
              <ThreeDotsIcon size={20} color="#FFFF" />
              <DatabaseImportIcon size={20} color="#FFFF" />
            </div>
            <span className="ml-1 text-mercury-30">Add data</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <div className="py-2 pb-0">
            <div className="flex items-center justify-between border-b-4 border-mercury-100 px-4 py-3">
              <span className="text-base font-medium text-mercury-950 opacity-30">
                Upload multiple files
              </span>
              <FoldersIcon color="#DFDFDF" />
            </div>
            {DATA_METHOD_LIST.map((item: any, index: number) => {
              const isLastItem = DATA_METHOD_LIST.length - 1 === index
              return (
                <div
                  className="group flex cursor-pointer items-center justify-between gap-5 border-b-1 border-mercury-100 px-4 py-3 hover:bg-mercury-100 aria-checked:border-transparent aria-checked:hover:rounded-b-2xl"
                  key={index}
                  aria-checked={isLastItem}
                  onClick={() => handleSelectOption(item)}
                >
                  <span className="text-base font-medium text-mercury-950 opacity-30 group-aria-checked:opacity-100">
                    {item.label}
                  </span>
                  <div>{item.icon}</div>
                </div>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>
      <CreatPrivateAgentModal
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setCreated={() => {}}
      />
    </>
  )
}

export default AddData
