import { persistor, store } from "@configs/store"
import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { HelmetProvider } from "react-helmet-async"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
// import "./gtag/clarity"
// import "./gtag/config"

// const envMode = import.meta.env.VITE_APP_ENV_MODE

const Providers = ({ children }: { children: JSX.Element }) => {
  return (
    <HelmetProvider>
      {/* {envMode === "production" && (
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Y4VWWET4LE"
        ></script>
      )} */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
              {children}
            </NextThemesProvider>
          </NextUIProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  )
}

export default Providers
