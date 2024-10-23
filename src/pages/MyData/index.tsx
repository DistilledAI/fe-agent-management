import AddData from "./AddData"
import EmailData from "./Email"
import FileData from "./File"
import LinkData from "./Link"

const MyData: React.FC = () => {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-5">
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
      <div className="flex flex-col gap-6">
        <LinkData />
        <FileData />
        <EmailData />
      </div>
    </div>
  )
}
export default MyData
