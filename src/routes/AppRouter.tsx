import MainLayoutDesktop from "@components/Layout/MainLayoutDesktop"
import { PATH_NAMES } from "@constants/index"
import HomePage from "@pages/Home"
import PageNotFound from "@pages/NotFound"
import { Route, Routes } from "react-router-dom"

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path={PATH_NAMES.HOME}
        //connect wallet modal
        element={<MainLayoutDesktop />}
      >
        <Route path={PATH_NAMES.HOME} element={<HomePage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRouter
