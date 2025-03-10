import {App} from "@browser/app-component"
import {LoginPage} from "@browser/login-page"
import {SignupPage} from "@browser/signup-page"
import {AppTRPCProvider} from "@browser/utils-trpc-tanstack"
import {updateZodErrorFormat} from "@shared/utils-zod-error"
import {createRoot} from "react-dom/client"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import "./index.css"

updateZodErrorFormat()

const rootElement = document.getElementById("root")

const root = (
  <AppTRPCProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<App />} />
      </Routes>
    </BrowserRouter>
  </AppTRPCProvider>
)

if (rootElement) {
  createRoot(rootElement).render(root)
} else {
  console.error("Root element not found")
}
