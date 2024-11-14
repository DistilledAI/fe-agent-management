import { TablerPlusIcon } from "@components/Icons/TablerPlusIcon"
import { TrashXIcon } from "@components/Icons/TrashXIcon"
import { Spinner } from "@nextui-org/react"
import useDeleteData from "@pages/MyData/DeleteData/useDelete"
import type { UploadFile, UploadProps } from "antd"
import { Upload } from "antd"
import { UploadFileStatus } from "antd/es/upload/interface"
import { useRef, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { uploadMyData } from "services/user"
import { styled } from "styled-components"

interface UploadCustomProps {
  fieldkey: string
  fileKey: string
  icon: any
  label: string
  accept?: string
  maxCount?: number
  multiple?: boolean
  moreCustomRequest?: any
}

const maxSizeUpload = 50

const UploadCustom: React.FC<UploadCustomProps> = ({
  fieldkey,
  fileKey,
  icon,
  label,
  accept = ".doc,.docx,application/pdf",
  multiple,
  moreCustomRequest,
}) => {
  const { botId } = useParams()
  const messagesEndRef = useRef<any>()
  const { control, setValue, getValues } = useFormContext()
  const uploadCVValue = getValues(fieldkey)
  const [fileListValue, setFileList] = useState<UploadFile[]>([])
  const { onDelete } = useDeleteData()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    scrollToBottom()
    const newFileList = fileList.filter((item) => item.status !== undefined)
    const fileListDone = newFileList?.filter((item) => item?.status === "done")
    const newFileListDone = fileListDone?.map((item) => item?.response?.id)
    setValue(fieldkey, newFileListDone)
    setFileList(newFileList)
  }

  const handleCustomRequest = async (options: any) => {
    const { onSuccess, onError, file } = options
    const formData = new FormData()
    formData.append("file", file)
    formData.append("key", fileKey)
    try {
      const response = await uploadMyData(formData)
      if (response) {
        onSuccess(response?.data?.[0])
        const fileId = response?.data?.[0]?.id
        moreCustomRequest([fileId])
      }
    } catch (error) {
      console.error(error)
      onError(error)
      toast.error(`${file.name} failed to upload.`)
    }
  }

  const beforeUpload = async (file: any) => {
    const isLtSize = file.size / 1024 / 1024 < maxSizeUpload
    if (!isLtSize) {
      toast.error(`The file size must be smaller than ${maxSizeUpload}MB!`)
    }

    return isLtSize
  }

  const props: UploadProps = {
    name: "file",
    onChange: handleChange,
    fileList: fileListValue,
    customRequest: handleCustomRequest,
    beforeUpload,
  }

  const mapIconFromStatus: Record<UploadFileStatus | string, JSX.Element> = {
    uploading: <Spinner size="sm" />,
    done: <TrashXIcon />,
    error: <TrashXIcon />,
  }

  const handleRemoveFile = async (record: any) => {
    await onDelete({ botId: Number(botId), ids: [record?.response?.id] })
    //set submit value
    const newUploadCVValue = uploadCVValue?.filter(
      (item: number) => item !== record?.response?.id,
    )
    setValue(fieldkey, newUploadCVValue)
    //set display value
    const newFileList = fileListValue?.filter(
      (item: any) => item.uid !== record?.uid,
    )
    setFileList(newFileList)
  }

  return (
    <Controller
      name="uploadCV"
      control={control}
      render={() => (
        <div className="broder h-fit !w-full rounded-[32px] border-[1px] border-mercury-200 bg-mercury-50 p-1">
          <StyledUpload
            {...props}
            showUploadList={false}
            accept={accept}
            style={{
              width: "100%",
            }}
            className="!w-full"
            // maxCount={maxCount}
            multiple={multiple}
          >
            <div className="flex h-[50px] w-full min-w-[130px] cursor-pointer items-center justify-between gap-2 rounded-full border border-mercury-70 bg-mercury-30 p-4 shadow-6">
              <div className="flex items-center gap-2">
                {icon}
                <span className="text-base-14-b mr-2 text-center">{label}</span>
              </div>
              <TablerPlusIcon />
            </div>
          </StyledUpload>

          {fileListValue.length > 0 && (
            <div className="flex max-h-[150px] flex-col overflow-auto p-3">
              {fileListValue.map((item: any) => {
                const isError = item?.status === "error"

                console.log("item", item)

                return (
                  <div
                    className="mb-3 grid w-full grid-cols-8 items-center gap-3"
                    key={item.uid}
                  >
                    {isError ? (
                      <div className="group col-span-7">
                        <span className="text-base-14-sb text-[#FF3B30]">
                          {item.name}
                        </span>
                      </div>
                    ) : (
                      <Link
                        target="_blank"
                        to={item?.response?.value}
                        className="col-span-7 max-w-[250px] truncate hover:underline"
                      >
                        <span className="text-base-14-sb">{item.name}</span>
                      </Link>
                    )}
                    <div
                      className="cursor-pointer"
                      onClick={() => handleRemoveFile(item)}
                    >
                      {mapIconFromStatus?.[item?.status]}
                    </div>
                  </div>
                )
              })}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      )}
    />
  )
}

const StyledUpload = styled(Upload)`
  &&& {
    .ant-upload {
      width: 100%;
    }
  }
`

export default UploadCustom
