import { SocialLinkIcon } from "@components/Icons/SocialLinkIcon"
import { TrashXIcon } from "@components/Icons/TrashXIcon"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import CreatPrivateAgentModal from "../Modal/CreatPrivateAgentModal"
import UploadDataButton from "../UploadDataButton"

const UploadSocialLink = () => {
  const [socialUrls, setSocialUrls] = useState<string[]>([])
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const { control, getValues, setValue } = useFormContext()
  const fieldkey = "uploadSocialLink"

  const handlemSetSocialUrls = (newUrl: string) => {
    setSocialUrls([...socialUrls, newUrl])
  }

  const handleRemoveLink = (record: any) => {
    const uploadSocialLinkValue = getValues(fieldkey)
    //set submit value
    const newUploadSocialLinkValue = uploadSocialLinkValue?.filter(
      (item: number) => item !== record?.id,
    )
    setValue(fieldkey, newUploadSocialLinkValue)

    //set display value
    const newFileList = socialUrls?.filter(
      (item: any) => item.uid !== record?.uid,
    )
    setSocialUrls(newFileList)
  }

  return (
    <>
      <Controller
        name="uploadSocialLink"
        control={control}
        render={() => (
          <UploadDataButton
            icon={<SocialLinkIcon />}
            label="Website links/Social Media"
            textClassName="text-base-14-b"
            onClick={() => setOpenPopup(true)}
            customClassName="mb-6"
          >
            {socialUrls.length > 0 && (
              <div className="max-h-[150px] overflow-auto p-3">
                {socialUrls.map((item: any, index: number) => (
                  <div
                    className="mb-3 grid w-full grid-cols-8 items-center gap-3"
                    key={index}
                  >
                    <div className="col-span-7">
                      <span className="text-base-14-sb">{item?.link}</span>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => handleRemoveLink(item)}
                    >
                      <TrashXIcon />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </UploadDataButton>
        )}
      />

      <CreatPrivateAgentModal
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        handlemSetSocialUrls={handlemSetSocialUrls}
      />
    </>
  )
}
export default UploadSocialLink
