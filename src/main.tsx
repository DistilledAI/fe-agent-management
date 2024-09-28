import "@rainbow-me/rainbowkit/styles.css"
import Providers from "Providers.tsx"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
      <ToastContainer />
    </Providers>
  </React.StrictMode>,
)
