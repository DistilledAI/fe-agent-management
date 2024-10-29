import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import useWindowSize from "@hooks/useWindowSize"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { getProfileInfo } from "services/chat"
import CollectingContent from "./CollectingContent"
import IntroVideo from "./IntroVideo"

type Inputs = {
  linkedin: string
}

export const PROFILE_TYPE = {
  LINKEDIN: "linkedin",
  TWITTER: "twitter",
}

const SOCIAL = [
  {
    key: PROFILE_TYPE.LINKEDIN,
    label: "LinkedIn",
  },
  {
    key: PROFILE_TYPE.TWITTER,
    label: "Twitter",
  },
]

const ProfileLinkForm: React.FC<{
  setContentStep: any
  setCollectedData: any
}> = ({ setContentStep, setCollectedData }) => {
  const { register, handleSubmit, watch, setValue, getValues } =
    useForm<Inputs>()
  const [selectedKey, setSelectedKey] = useState<string>(PROFILE_TYPE.LINKEDIN)
  const inputValue = watch(selectedKey as any)
  const [loading, setLoading] = useState<boolean>(false)
  const selectedLabel = SOCIAL.find((item) => item.key == selectedKey)?.label
  const { isMobile } = useWindowSize()

  const getUserName = (url: string) => {
    if (selectedKey === PROFILE_TYPE.LINKEDIN) {
      let match = url.match(/in\/([^\/]+)/)
      return match ? match[1] : null
    }

    let match = url.match(/x.com\/([^\/]+)/)
    return match ? match[1] : null
  }

  const callGetProfileInfo = async (data: any) => {
    setLoading(true)
    const profileLink = data?.[selectedKey]
    const userName = getUserName(profileLink) as any

    try {
      const typePayload =
        selectedKey === PROFILE_TYPE.TWITTER ? "x" : selectedKey
      const res = await getProfileInfo({
        type: typePayload,
        userName,
      })
      if (res) {
        setCollectedData({ ...res?.data, profileType: selectedKey, userName })
        setLoading(false)
        setContentStep(2)
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data) callGetProfileInfo(data)
  }

  const onChangeProfileType = (record: any) => {
    setSelectedKey(record.key)
    setValue(record.key, "")
  }

  const renderDropdown = () => {
    return (
      <Dropdown>
        <DropdownTrigger>
          <div className="flex-items-center cursor-pointer rounded-full bg-mercury-30 px-2 py-[6px]">
            <span className="text-16 text-mercury-950">{selectedLabel}</span>
            <ChevronDownIcon />
          </div>
        </DropdownTrigger>
        <DropdownMenu
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={[selectedKey]}
        >
          {SOCIAL.map((record) => (
            <DropdownItem
              key={record.key}
              onClick={() => onChangeProfileType(record)}
            >
              <span className="text-16 text-mercury-950">{record.label}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    )
  }

  if (loading) {
    if (isMobile)
      return (
        <div>
          <IntroVideo />
          <CollectingContent setContentStep={setContentStep} />
        </div>
      )

    return <CollectingContent setContentStep={setContentStep} />
  }

  if (isMobile) {
    return (
      <>
        <IntroVideo />
        <span className="flex items-center justify-center text-center text-[24px] font-semibold text-mercury-950">
          Website links/Social Media
        </span>
        <Input
          placeholder="Enter your profile link"
          labelPlacement="outside"
          startContent={<>{renderDropdown()}</>}
          classNames={{
            inputWrapper:
              "!bg-mercury-200 rounded-full mt-4 !border !border-mercury-400 px-2",
            innerWrapper: "!bg-mercury-200 rounded-full",
            input: "text-18 !text-mercury-950 caret-[#363636]",
          }}
          size="lg"
          value={getValues(selectedKey as any)}
          {...register(selectedKey as any)}
        />
        <Button
          className="mt-4 w-full rounded-full bg-mercury-950"
          size="lg"
          onClick={handleSubmit(onSubmit)}
          isDisabled={!inputValue}
        >
          <span className="text-18 text-mercury-30">Connect</span>
        </Button>
      </>
    )
  }

  return (
    <>
      <span className="text-[24px] font-semibold text-mercury-950">
        Website links (including Social Media)
      </span>
      <Input
        placeholder="Enter your profile link"
        labelPlacement="outside"
        startContent={<>{renderDropdown()}</>}
        classNames={{
          inputWrapper:
            "!bg-mercury-200 rounded-full mt-4 !border !border-mercury-400 px-2",
          innerWrapper: "!bg-mercury-200 rounded-full",
          input: "text-18 !text-mercury-950 caret-[#363636]",
        }}
        size="lg"
        value={getValues(selectedKey as any)}
        {...register(selectedKey as any)}
      />
      <Button
        className="mt-4 w-full rounded-full bg-mercury-950"
        size="lg"
        onClick={handleSubmit(onSubmit)}
        isDisabled={!inputValue}
      >
        <span className="text-18 text-mercury-30">Connect</span>
      </Button>
    </>
  )
}
export default ProfileLinkForm
