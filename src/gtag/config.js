const envMode = import.meta.env.VITE_APP_ENV_MODE
if (envMode === "production") {
  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line no-inner-declarations
  function gtag() {
    // eslint-disable-next-line no-undef
    dataLayer.push(arguments)
  }
  gtag("js", new Date())

  gtag("config", "G-Y4VWWET4LE")
}
