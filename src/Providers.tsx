import { persistor, store } from "@configs/store"
import { config } from "@configs/wagmi"
import { NextUIProvider } from "@nextui-org/react"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SocketProvider } from "providers/SocketProvider"
import { HelmetProvider } from "react-helmet-async"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { WagmiProvider } from "wagmi"

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
