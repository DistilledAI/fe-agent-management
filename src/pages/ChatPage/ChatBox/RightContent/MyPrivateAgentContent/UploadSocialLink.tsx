import { SocialLinkIcon } from "@components/Icons/SocialLinkIcon"
import { TrashXIcon } from "@components/Icons/TrashXIcon"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Link } from "react-router-dom"
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
            label="Website Links/Social Media"
            textClassName="text-base-14-b"
            onClick={() => setOpenPopup(true)}
            customClassName="mb-6 max-sm:mb-4"
          >
            {socialUrls.length > 0 && (
              <div className="max-h-[150px] overflow-auto p-3">
                {socialUrls.map((item: any, index: number) => {
                  const isError = item?.status === "error"

                  return (
                    <div
                      className="mb-3 grid w-full grid-cols-8 items-center gap-3"
                      key={index}
                    >
                      {isError ? (
                        <div className="group col-span-7">
                          <span className="text-base-14-sb text-[#FF3B30]">
                            {item?.link}
                          </span>
                        </div>
                      ) : (
                        <Link
                          target="_blank"
                          to={item?.link}
                          className="col-span-7 max-w-[250px] truncate hover:underline"
                        >
                          <span className="text-base-14-sb">{item?.link}</span>
                        </Link>
                      )}

                      <div
                        className="cursor-pointer"
                        onClick={() => handleRemoveLink(item)}
                      >
                        <TrashXIcon />
                      </div>
                    </div>
                  )
                })}
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
