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
    <FormCard title="Sign in to your account">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md space-y-4">
          <TextField
            label="Email address"
            placeholder="Email address"
            value={email}
            onChange={setEmail}
            inputRef={emailInputRef}
          />
          <TextField
            label="Password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
            type="password"
            inputRef={passwordInputRef}
          />
        </div>

        <div>
          <Button type="submit">Sign in</Button>
        </div>
      </form>
    </FormCard>
  )
}
