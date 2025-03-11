import {ReactNode} from "react"
import {Icon} from "./icon-component"
import {LucideIcon} from "lucide-react"

type ButtonProps = {
  type?: "button" | "submit" | "reset"
  children?: ReactNode
  onClick?: () => void
  icon?: LucideIcon
  disabled?: boolean
  variant?: "primary" | "secondary" | "outline" | "icon"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
}

export function Button({
  type = "button",
  children,
  onClick,
  icon,
  disabled = false,
  variant = "primary",
  size = "md",
  fullWidth = true,
}: ButtonProps) {

  // Variant styles
  const variantStyles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white border-transparent",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 border-transparent",
    outline: "bg-white hover:bg-gray-50 text-indigo-600 border-indigo-600",
    icon: "bg-transparent hover:bg-gray-100 text-gray-700 border-transparent p-2 rounded-full",
  }

  // Size styles
  const sizeStyles = {
    sm: "text-xs py-1.5 px-3 rounded",
    md: "text-sm py-2 px-4 rounded-md",
    lg: "text-base py-2.5 px-5 rounded-md",
  }

  // If it's an icon button, override the size styles
  const appliedSizeStyles = variant === "icon" ? "" : sizeStyles[size]

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center font-medium transition-colors duration-150 ease-in-out
        border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        ${variantStyles[variant]} 
        ${appliedSizeStyles}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}>
      {icon && (
        <Icon
          icon={icon}
          size={size === "lg" ? 20 : size === "md" ? 18 : 16}
          className={children ? "mr-2" : ""}
        />
      )}
      <span>{children}</span>
    </button>
  )
}
