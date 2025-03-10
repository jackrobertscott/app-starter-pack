import {App} from "@browser/app-component"
import {LoginPage} from "@browser/login-page"
import {SignupPage} from "@browser/signup-page"
import {isAuthenticated} from "@browser/utils-auth"
import {AppTRPCProvider} from "@browser/utils-trpc-tanstack"
import {updateZodErrorFormat} from "@shared/utils-zod-error"
import {ReactNode, useEffect} from "react"
import {createRoot} from "react-dom/client"
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"
import "./index.css"

updateZodErrorFormat()

// Protected route - redirects to login if not authenticated
function ProtectedRoute({children}: {children: ReactNode}) {
  const navigate = useNavigate()
  const location = useLocation()
  const authenticated = isAuthenticated()

  useEffect(() => {
    if (!authenticated) {
      // Redirect to login page but save the location they were trying to access
      console.log("Redirecting to login")
      navigate("/", {state: {from: location.pathname}, replace: true})
    }
  }, [authenticated, navigate, location])

  // Only render children if user is authenticated
  return authenticated ? <>{children}</> : null
}

// Auth route - redirects to dashboard if already authenticated
function AuthRoute({children}: {children: ReactNode}) {
  const navigate = useNavigate()
  const location = useLocation()
  const authenticated = isAuthenticated()

  useEffect(() => {
    if (authenticated) {
      // Redirect to dashboard, or to the page they were trying to access
      console.log("Redirecting to dashboard")
      const destination = location.state?.from || "/home"
      navigate(destination, {replace: true})
    }
  }, [authenticated, navigate, location])

  // Only render children if user is not authenticated
  return !authenticated ? <>{children}</> : null
}

const rootElement = document.getElementById("root")

const root = (
  <AppTRPCProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <SignupPage />
            </AuthRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </AppTRPCProvider>
)

if (rootElement) {
  createRoot(rootElement).render(root)
} else {
  console.error("Root element not found")
}
