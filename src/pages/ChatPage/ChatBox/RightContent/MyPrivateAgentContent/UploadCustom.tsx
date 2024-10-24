import { TablerPlusIcon } from "@components/Icons/TablerPlusIcon"
import { TrashXIcon } from "@components/Icons/TrashXIcon"
import { Spinner } from "@nextui-org/react"
import type { UploadFile, UploadProps } from "antd"
import { Upload } from "antd"
import { UploadFileStatus } from "antd/es/upload/interface"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { uploadMyData } from "services/user"
import { styled } from "styled-components"

interface UploadCustomProps {
  fieldkey: string
  fileKey: string
  icon: any
  label: string
  accept?: string
}

const UploadCustom: React.FC<UploadCustomProps> = ({
  fieldkey,
  fileKey,
  icon,
  label,
  accept = ".doc,.docx,application/pdf",
}) => {
  const { control, setValue, getValues } = useFormContext()
  const uploadCVValue = getValues(fieldkey)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  const handleCustomRequest = async (options: any) => {
    const { onSuccess, onError, file } = options
    const formData = new FormData()
    formData.append("file", file)
    formData.append("key", fileKey)
    try {
      const response = await uploadMyData(formData)
      if (response) {
        const fileId = response?.data?.[0]?.id
        onSuccess(response?.data?.[0])
        const newData =
          uploadCVValue.length > 0 ? [...uploadCVValue, fileId] : [fileId]
        setValue(fieldkey, newData)
        toast.success(`${file.name} uploaded successfully.`)
      }
    } catch (error) {
      console.error(error)
      onError(error)
      toast.error(`${file.name} failed to upload.`)
    }
  }

  const props: UploadProps = {
    name: "file",
    onChange: handleChange,
    fileList: fileList,
    customRequest: handleCustomRequest,
  }

  const mapIconFromStatus: Record<UploadFileStatus | string, JSX.Element> = {
    uploading: <Spinner size="sm" />,
    done: <TrashXIcon />,
    error: <TrashXIcon />,
  }

  const handleRemoveFile = (record: any) => {
    console.log("🚀 ~ handleRemoveFile ~ record:", record)
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
          >
            <div className="flex h-[50px] w-full min-w-[130px] cursor-pointer items-center justify-between gap-2 rounded-full border border-mercury-70 bg-mercury-30 p-4 shadow-6">
              <div className="flex items-center gap-2">
                {icon}
                <span className="text-base-b mr-2 text-center">{label}</span>
              </div>
              <TablerPlusIcon />
            </div>
          </StyledUpload>

          {fileList.length > 0 && (
            <div className="flex max-h-[150px] flex-col overflow-auto p-3">
              {fileList.map((item: any) => {
                const isError = item?.status === "error"

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
                        to={item?.value}
                        className="col-span-7 hover:underline"
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
