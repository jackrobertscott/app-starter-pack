import {mdiAccount, mdiEmail, mdiLock, mdiLogin} from "@mdi/js"
import React, {useRef, useState} from "react"
import {useNavigate} from "react-router-dom"
import {Button} from "./components/button-component"
import {FormCard} from "./components/form-card-component"
import {TextField} from "./components/text-field-component"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt with:", {email, password})
    navigate("/home")
  }

  return (
    <FormCard title="Welcome Back" iconPath={mdiAccount}>
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md space-y-5">
          <TextField
            label="Email address"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
            inputRef={emailInputRef}
            iconPath={mdiEmail}
          />
          <TextField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            type="password"
            inputRef={passwordInputRef}
            iconPath={mdiLock}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
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
          <Button type="submit" iconPath={mdiLogin}>
            Sign in
          </Button>
        </div>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <a
            href="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </a>
        </div>
      </form>
    </FormCard>
  )
}
