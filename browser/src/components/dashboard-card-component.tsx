import {ReactNode} from "react"
import {Icon} from "./icon-component"
import { LucideIcon } from "lucide-react"

type DashboardCardProps = {
  title: string
  children: ReactNode
  icon?: LucideIcon
  iconColor?: string
  accentColor?: string
  action?: ReactNode
  compact?: boolean
}

export function DashboardCard({
  title,
  children,
  icon,
  iconColor = "white",
  accentColor = "bg-indigo-600",
  action,
  compact = false,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      <div className={`px-4 py-3 ${accentColor} flex items-center justify-between`}>
        <div className="flex items-center">
          {icon && (
            <div className="rounded-full bg-white/20 p-1.5 mr-2">
              <Icon icon={icon} size={18} color={iconColor} />
            </div>
          )}
          <h3 className="text-base font-medium text-white">{title}</h3>
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className={compact ? "p-2" : "p-4"}>{children}</div>
    </div>
  )
}