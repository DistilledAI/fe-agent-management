import { SocialLinkIcon } from "@components/Icons/SocialLinkIcon"
import { TrashXIcon } from "@components/Icons/TrashXIcon"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import CreatPrivateAgentModal from "../Modal/CreatPrivateAgentModal"
import UploadDataButton from "../UploadDataButton"

interface UploadSocialLinkProps {
  socialUrls: any
  setSocialUrls: any
}

const UploadSocialLink: React.FC<UploadSocialLinkProps> = ({
  socialUrls,
  setSocialUrls,
}) => {
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const { control } = useFormContext()

  const handlemSetSocialUrls = (newUrl: string) => {
    setSocialUrls([...socialUrls, newUrl])
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
                      <span className="text-base-14-sb">{item}</span>
                    </div>
                    <div className="cursor-pointer">
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
