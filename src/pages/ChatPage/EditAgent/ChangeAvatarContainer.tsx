import { Upload, UploadFile, UploadProps } from "antd"
import { useState } from "react"
import { toast } from "react-toastify"
import { uploadMyData } from "services/user"

const maxSizeUpload = 50

const ChangeAvatarContainer: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    const newFileList = fileList.filter((item) => item.status !== undefined)
    const fileListDone = newFileList.filter((item) => item?.status === "done")
    const newFileListDone = fileListDone.map((item) => item?.response?.id)
    // setValue(fieldkey, newFileListDone)
    setFileList(newFileList)
  }

  const handleCustomRequest = async (options: any) => {
    const { onSuccess, onError, file } = options
    const formData = new FormData()
    formData.append("file", file)
    try {
      const response = await uploadMyData(formData)
      if (response) {
        onSuccess(response?.data?.[0])
        toast.success(`${file.name} uploaded successfully.`)
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
    fileList: fileList,
    customRequest: handleCustomRequest,
    beforeUpload,
  }
  return (
    <Upload {...props} accept="image/*">
      {children}
    </Upload>
  )
}
export default ChangeAvatarContainer
