import { EmailUpIcon } from "@components/Icons/EmailUpIcon"
import { TrashXIcon } from "@components/Icons/TrashXIcon"
import type { UploadFile, UploadProps } from "antd"
import { Upload } from "antd"
import { useState } from "react"
import UploadDataButton from "../UploadDataButton"

interface UploadCVProps {
  cvFiles: any
  setCVFiles: any
}

const UploadCV: React.FC<UploadCVProps> = ({ cvFiles, setCVFiles }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-xxx",
      percent: 50,
      name: "image.png",
      status: "uploading",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-5",
      name: "image.png",
      status: "error",
    },
  ])

  const handlemSetSocialUrls = (newUrl: string) => {
    setCVFiles([...cvFiles, newUrl])
  }

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  const props: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },

    onChange: handleChange,
    fileList: fileList,
  }

  return (
    <Upload
      {...props}
      showUploadList={false}
      accept=".doc,.docx,application/pdf"
    >
      <UploadDataButton
        icon={<EmailUpIcon />}
        label="CV"
        textClassName="text-base-14-b"
        customClassName="mb-6"
      >
        <div className="flex max-h-[150px] flex-col overflow-auto p-3">
          {fileList.map((item) => (
            <div
              className="mb-3 grid w-full grid-cols-8 items-center gap-3"
              key={item.uid}
            >
              <div className="col-span-7">
                <span className="text-base-14-sb">{item.name}</span>
              </div>
              <div className="cursor-pointer">
                <TrashXIcon />
              </div>
            </div>
          ))}
        </div>
      </UploadDataButton>
    </Upload>
  )
}
export default UploadCV
