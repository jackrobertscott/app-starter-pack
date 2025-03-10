import {mdiLogin} from "@mdi/js"
import {ReactNode} from "react"
import {Icon} from "./icon-component"

type ButtonProps = {
  type?: "button" | "submit" | "reset"
  children: ReactNode
  onClick?: () => void
  iconPath?: string
}

export function Button({type = "button", children, onClick, iconPath = mdiLogin}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="group relative w-full flex justify-center py-3 px-4 
                border border-transparent text-sm font-medium rounded-lg 
                text-white bg-gradient-to-r from-indigo-600 to-blue-600 
                hover:from-indigo-700 hover:to-blue-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                transition-all duration-150 ease-in-out">
      <div className="absolute left-0 inset-y-0 flex items-center pl-3">
        <Icon path={iconPath} size={20} color="#a5b4fc" />
      </div>
      <span className="text-base font-semibold">{children}</span>
    </button>
  )
}