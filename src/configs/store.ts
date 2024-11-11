import { configureStore, Store } from "@reduxjs/toolkit"
import { Persistor, persistReducer, persistStore } from "redux-persist"
import rootReducer from "@reducers/index"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import sessionStorage from "redux-persist/lib/storage/session"
import localStorage from "redux-persist/lib/storage"

let store: Store
let persistor: Persistor

const initStore = (isLocalStorage: boolean) => {
  const persistConfig = {
    key: "root",
    storage: isLocalStorage ? localStorage : sessionStorage,
    whitelist: ["agents", "sidebarCollapsed", "user"],
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })

  persistor = persistStore(store)
}

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// })

// const persistor = persistStore(store)

export { store, persistor, initStore }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
