import { CloseFilledIcon } from "@components/Icons/DefiLens/index.tsx"
import Providers from "Providers.tsx"
import ReactDOM from "react-dom/client"
import { ToastContainer } from "react-toastify"
import "regenerator-runtime/runtime"
import App from "./App.tsx"
import React from "react"
import "react-toastify/dist/ReactToastify.css"
import "@rainbow-me/rainbowkit/styles.css"
import "./index.css"
import "swiper/css"
import "swiper/css/pagination"

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
    ,
  </React.StrictMode>,
)
