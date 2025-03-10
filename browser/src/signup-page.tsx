import {mdiAccount, mdiEmail, mdiLock, mdiAccountPlus} from "@mdi/js"
import React, {useRef, useState} from "react"
import {useNavigate} from "react-router-dom"
import {Button} from "./components/button-component"
import {FormCard} from "./components/form-card-component"
import {TextField} from "./components/text-field-component"
import {trpc} from "./utils-trpc-client"

export function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  
  const navigate = useNavigate()
  const signup = trpc.signup.useMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    
    try {
      const result = await signup.mutateAsync({
        name,
        email,
        password,
      })
      
      // Store token in localStorage
      localStorage.setItem("authToken", result.token)
      
      // Redirect to home page
      navigate("/home")
    } catch (err: any) {
      setError(err.message || "An error occurred during signup")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormCard title="Create Account" iconPath={mdiAccount}>
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        
        <div className="rounded-md space-y-5">
          <TextField
            label="Name"
            placeholder="John Doe"
            value={name}
            onChange={setName}
            inputRef={nameInputRef}
            iconPath={mdiAccount}
          />
          
          <TextField
            label="Email address"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
            inputRef={emailInputRef}
            iconPath={mdiEmail}
            type="email"
          />
          
          <TextField
            label="Password"
            placeholder="Create a password"
            value={password}
            onChange={setPassword}
            type="password"
            inputRef={passwordInputRef}
            iconPath={mdiLock}
          />
        </div>

        <div>
          <Button type="submit" iconPath={mdiAccountPlus} disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign up"}
          </Button>
        </div>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <a
            href="/"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </a>
        </div>
      </form>
    </FormCard>
  )
}