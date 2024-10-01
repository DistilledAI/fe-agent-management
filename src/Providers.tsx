import { persistor, store } from "@configs/store"
import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { HelmetProvider } from "react-helmet-async"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { config } from "@configs/wagmi"
import { SocketProvider } from "providers/SocketProvider"

const queryClient = new QueryClient()

const Providers = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <SocketProvider>
                <RainbowKitProvider locale="en-US">
                  <NextUIProvider>
                    <NextThemesProvider attribute="class" defaultTheme="light">
                      {children}
                    </NextThemesProvider>
                  </NextUIProvider>
                </RainbowKitProvider>
              </SocketProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  )
}

export default Providers
