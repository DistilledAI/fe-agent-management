import useAuthState from "@hooks/useAuthState"
import { useDisclosure } from "@nextui-org/react"
import { cachedLocalStorage, storageKey } from "@utils/storage"
import { useEffect, useState } from "react"

const useDisclaimer = () => {
  const { isLogin, isAnonymous } = useAuthState()
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure()
  const [isAccepted, setIsAccepted] = useState(
    cachedLocalStorage.getItem(storageKey.DISCLAIMER) === "1",
  )

  useEffect(() => {
    if (isAccepted) onClose()
    else if (isLogin && !isAnonymous && !isAccepted) {
      onOpen()
    }
  }, [isAccepted])

  const onAccept = () => {
    cachedLocalStorage.setItem(storageKey.DISCLAIMER, "1")
    setIsAccepted(true)
  }

  return { isOpen, onOpenChange, isAccepted, onAccept, onOpen }
}

export default useDisclaimer
