import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"
import babel from "vite-plugin-babel"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import tsconfigPaths from "vite-tsconfig-paths"
import Sitemap from "vite-plugin-sitemap"
import { PATH_NAMES } from "./src/constants/index"

export default defineConfig(() => {
  return {
    root: ".",
    plugins: [
      react(),
      tsconfigPaths(),
      babel(),
      nodePolyfills(),
      Sitemap({
        hostname: "https://mesh.distilled.ai",
        dynamicRoutes: [
          PATH_NAMES.HOME,
          PATH_NAMES.MARKETPLACE,
          PATH_NAMES.REWARDS,
          PATH_NAMES.BETTING,
          PATH_NAMES.CREATE_AGENT,
          PATH_NAMES.MY_AGENTS,
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  }
})
