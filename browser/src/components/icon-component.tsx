import {LucideIcon, LucideProps} from "lucide-react"

type IconProps = {
  icon: LucideIcon
  size?: number
  color?: string
  className?: string
  strokeWidth?: number
} & Omit<LucideProps, "size" | "color" | "className" | "strokeWidth">

export function Icon({
  icon: LucideIcon,
  size = 24,
  color = "currentColor",
  className = "",
  strokeWidth = 2,
  ...props
}: IconProps) {
  return (
    <LucideIcon
      size={size}
      color={color}
      className={className}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}
