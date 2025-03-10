import {App} from "@browser/app"
import {updateZodErrorFormat} from "@shared/utils-zod-error"
import {createRoot} from "react-dom/client"
import {BrowserRouter} from "react-router"

updateZodErrorFormat()

const rootElement = document.getElementById("root")

const root = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

if (rootElement) {
  createRoot(rootElement).render(root)
} else {
  console.error("Root element not found")
}
