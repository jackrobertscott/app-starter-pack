import { User, LucideIcon } from "lucide-react"
import {Icon} from "./icon-component"

type UserAvatarProps = {
  name?: string
  size?: "sm" | "md" | "lg"
  icon?: LucideIcon
}

export function UserAvatar({
  name,
  size = "md",
  icon = User,
}: UserAvatarProps) {
  // Generate initials from name
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : ""

  // Set sizes based on size prop
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-medium`}>
      {name ? initials : <Icon icon={icon} size={size === "lg" ? 28 : size === "md" ? 20 : 16} color="white" />}
    </div>
  )
}