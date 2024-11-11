import { CloseFilledIcon } from "@components/Icons/DefiLens/index.tsx"
import "@rainbow-me/rainbowkit/styles.css"
import Providers from "Providers.tsx"
import ReactDOM from "react-dom/client"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "regenerator-runtime/runtime"
import App from "./App.tsx"
import "./index.css"
import React from "react"
import { initStore } from "@configs/store.ts"

const hasAccessToken = localStorage.getItem("accessToken")
initStore(!!hasAccessToken)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
      <ToastContainer
        toastClassName=" rounded-[14px] text-14-md bg-mercury-30"
        closeButton={<CloseFilledIcon size={18} />}
        bodyClassName={() => "text-14-md flex items-center"}
        hideProgressBar={true}
      />
    </Providers>
  </React.StrictMode>,
)
