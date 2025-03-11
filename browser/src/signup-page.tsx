import {getRememberMe, setAuthToken} from "@browser/utils-auth"
import {useTRPC} from "@browser/utils-trpc-context"
import { User, UserPlus, Mail, Lock } from "lucide-react"
import {useMutation} from "@tanstack/react-query"
import React, {useState, useEffect, useRef} from "react"
import {Link, useLocation, useNavigate} from "react-router-dom"
import {Button} from "./components/button-component"
import {FormCard} from "./components/form-card-component"
import {TextField} from "./components/text-field-component"

export function SignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const trpc = useTRPC()
  
  const rememberMeRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const signup = useMutation(trpc.signup.mutationOptions())
  
  // Initialize remember me from previous preference
  useEffect(() => {
    setRememberMe(getRememberMe())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await signup.mutateAsync({
        firstName,
        lastName,
        email,
        password,
      })

      // Store token using auth utility with remember me preference and email
      setAuthToken(result.token, rememberMe, email)

      // Redirect to home page or intended destination
      const destination = location.state?.from || "/home"
      navigate(destination, { replace: true })
    } catch (err: any) {
      setError(err.message || "An error occurred during signup")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormCard title="Create Account" icon={User}>
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="rounded-md space-y-5">
          <TextField
            label="First Name"
            placeholder="John"
            value={firstName}
            onChange={setFirstName}
            icon={User}
          />

          <TextField
            label="Last Name"
            placeholder="Doe"
            value={lastName}
            onChange={setLastName}
            icon={User}
          />

          <TextField
            label="Email address"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
            icon={Mail}
            type="email"
          />

          <TextField
            label="Password"
            placeholder="Create a password"
            value={password}
            onChange={setPassword}
            type="password"
            icon={Lock}
          />
        </div>

        <div className="flex items-center my-4">
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

        <div>
          <Button type="submit" icon={UserPlus} disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign up"}
          </Button>
        </div>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
          </span>
          <Link
            to="/"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </div>
      </form>
    </FormCard>
  )
}
