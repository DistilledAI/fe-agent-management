import { EditPenFilledIcon } from "@components/Icons/Edit"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import { IUser, updateUser as updateUserSlice } from "@reducers/userSlice"
import { useRef } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { updateUser } from "services/user"

const AuthorDescription = () => {
  const { user } = useAuthState()
  const dispatch = useDispatch()
  const descriptionRef = useRef<any>()

  const handleUpdate = async () => {
    const description = descriptionRef.current.innerText
    if (description === user?.description) return
    dispatch(updateUserSlice({ user: { ...user, description } as IUser }))
    await updateUser({
      description,
      username: user?.username,
      avatar: user?.avatar,
    })
    toast.success("Updated successfully!")
  }

  const handleFocus = () => {
    descriptionRef.current.focus()
    const range = document.createRange()
    const selection = window.getSelection()
    if (!selection) return
    range.selectNodeContents(descriptionRef.current)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault()
      descriptionRef.current.blur()
    }
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-mercury-600">Bio:</span>
      <div className="flex items-center gap-2">
        <span
          ref={descriptionRef}
          onBlur={handleUpdate}
          onKeyDown={handleKeyDown}
          contentEditable={true}
          className="line-clamp-1 block max-w-36 text-ellipsis whitespace-nowrap text-mercury-900 focus:border-none focus:outline-none"
        >
          {user?.description ?? "-"}
        </span>
        <Button
          onClick={handleFocus}
          className="h-auto w-auto min-w-0 bg-transparent p-0"
        >
          <EditPenFilledIcon />
        </Button>
      </div>
    </div>
  )
}

export default AuthorDescription
