import {Icon} from "./icon-component"
import { LucideIcon } from "lucide-react"

type StatsCardProps = {
  title: string
  value: string | number
  icon: LucideIcon
  iconColor?: string
  accentColor?: string
  trend?: {
    value: number
    label: string
  }
}

export function StatsCard({
  title,
  value,
  icon,
  iconColor = "white",
  accentColor = "bg-blue-600",
  trend,
}: StatsCardProps) {
  const isPositiveTrend = trend ? trend.value >= 0 : false
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{title}</p>
          <p className="text-xl font-bold mt-0.5">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-1">
              <span
                className={`text-xs font-medium ${
                  isPositiveTrend ? "text-green-600" : "text-red-600"
                }`}>
                {isPositiveTrend ? "+" : ""}{trend.value}%
              </span>
              <span className="text-xs text-gray-500 ml-1">{trend.label}</span>
            </div>
          )}
        </div>
        
        <div className={`${accentColor} rounded-md p-1.5`}>
          <Icon icon={icon} size={18} color={iconColor} />
        </div>
      </div>
    </div>
  )
}