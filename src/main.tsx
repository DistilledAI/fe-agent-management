import { CloseFilledIcon } from "@components/Icons/DefiLens/index.tsx"
import "@rainbow-me/rainbowkit/styles.css"
import Providers from "Providers.tsx"
import React from "react"
import ReactDOM from "react-dom/client"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "regenerator-runtime/runtime"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import App from "./App.tsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
      <ToastContainer
        toastClassName="rounded-[14px] text-14 font-medium  bg-mercury-30"
        closeButton={<CloseFilledIcon size={18} />}
        bodyClassName="text-14 font-medium flex items-center"
        hideProgressBar={true}
        autoClose={2000}
      />
    </Providers>
  </React.StrictMode>,
)
