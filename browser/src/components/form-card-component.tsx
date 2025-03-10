import {mdiAccount} from "@mdi/js"
import {ReactNode} from "react"
import {Icon} from "./icon-component"

type FormCardProps = {
  title: string
  children: ReactNode
  iconPath?: string
}

export function FormCard({title, children, iconPath = mdiAccount}: FormCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <div className="max-w-md w-full space-y-6 p-10 bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
            <Icon path={iconPath} size={32} color="white" />
          </div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}