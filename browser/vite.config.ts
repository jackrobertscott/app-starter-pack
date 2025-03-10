import VitePluginReact from "@vitejs/plugin-react"
import {resolve} from "path"
import {defineConfig} from "vite"

export default defineConfig({
  server: {
    port: 3000,
  },
  esbuild: {
    legalComments: "none", // hide comments files + lib
    keepNames: true, // transform function.name accessors into string literals
  },
  resolve: {
    alias: {
      "@browser": resolve(__dirname, "src"),
      "@shared": resolve(__dirname, "../shared/src"),
    },
  },
  plugins: [
    VitePluginReact({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
})
