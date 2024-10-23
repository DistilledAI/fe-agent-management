import useWindowSize from "@hooks/useWindowSize"
import AddData from "./AddData"
import EmailData from "./Email"
import FileData from "./File"
import LinkData from "./Link"
import MediaData from "./Media"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"

const MyData: React.FC = () => {
  const { isMobile } = useWindowSize()
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-[800px] px-4 py-5 max-sm:bg-mercury-70 max-sm:pt-[70px]">
      {isMobile ? (
        <div className="fixed left-0 top-0 z-[1] flex h-[55px] w-full items-center justify-between bg-white px-4">
          <Button
            onClick={() => navigate(-1)}
            className="h-9 w-9 min-w-0 rounded-full bg-mercury-70 p-0"
          >
            <ArrowLeftFilledIcon />
          </Button>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold text-mercury-900">
            My Data
          </div>
          <AddData />
        </div>
      ) : (
        <div className="mb-10 flex items-center justify-between">
          <div className="text-mercury-950">
            <h3 className="mb-1 text-24 font-semibold">My data</h3>
            <div className="inline-flex items-center text-mercury-800">
              <span>Last collected:</span>
              <span className="ml-1 font-semibold">2 days ago</span>
            </div>
          </div>
          <AddData />
        </div>
      )}
      <div className="mb-5 inline-flex items-center text-mercury-800 sm:hidden">
        <span>Last collected:</span>
        <span className="ml-1 font-semibold">2 days ago</span>
      </div>
      <div className="flex flex-col gap-6">
        <LinkData />
        <FileData />
        <EmailData />
        <MediaData />
      </div>
    </div>
  )
}
export default MyData
