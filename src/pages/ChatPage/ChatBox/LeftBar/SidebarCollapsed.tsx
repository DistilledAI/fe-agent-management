import { CollapseLeftIcon } from "@components/Icons/Collapse"
import { useAppDispatch, useAppSelector } from "@hooks/useAppRedux"
import { Button } from "@nextui-org/react"
import { updateSidebarCollapsed } from "@reducers/sidebarCollapsedSlice"

const SidebarCollapsed = () => {
  const dispatch = useAppDispatch()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  const handleSidebarCollapsed = () => {
    dispatch(updateSidebarCollapsed(!sidebarCollapsed))
  }

  return (
    <Button
      isIconOnly
      className="h-fit min-h-fit w-fit min-w-fit bg-transparent"
      onClick={handleSidebarCollapsed}
    >
      <CollapseLeftIcon />
    </Button>
  )
}

export default SidebarCollapsed
