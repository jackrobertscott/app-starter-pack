import {getRememberMe, getSavedEmail, setAuthToken} from "@browser/utils-auth"
import {useTRPC} from "@browser/utils-trpc-context"
import {useMutation} from "@tanstack/react-query"
import {Lock, LogIn, Mail, User} from "lucide-react"
import React, {useEffect, useRef, useState} from "react"
import {Link, useLocation, useNavigate} from "react-router-dom"
import {Button} from "./components/button-component"
import {FormCard} from "./components/form-card-component"
import {TextField} from "./components/text-field-component"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const rememberMeRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const trpc = useTRPC()
  const login = useMutation(trpc.login.mutationOptions())

  // Initialize remember me and email from previous preferences
  useEffect(() => {
    setRememberMe(getRememberMe())

    // Pre-fill email if it was saved
    const savedEmail = getSavedEmail()
    if (savedEmail) {
      setEmail(savedEmail)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await login.mutateAsync({
        email,
        password,
      })

      // Store token using auth utility with remember me preference and email
      setAuthToken(result.token, rememberMe, email)

      // Redirect to home page or intended destination
      const destination = location.state?.from || "/home"
      navigate(destination, {replace: true})
    } catch (err: any) {
      setError(err.message || "Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormCard title="Welcome" icon={User}>
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="rounded-md space-y-5">
          <TextField
            label="Email address"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
            inputRef={emailInputRef}
            icon={Mail}
            type="email"
          />
          <TextField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            type="password"
            inputRef={passwordInputRef}
            icon={Lock}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              ref={rememberMeRef}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <Button type="submit" icon={LogIn} disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </div>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link
            to="/signup"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </div>
      </form>
    </FormCard>
  )
}
