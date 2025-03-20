import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface HexagonalIconProps {
  Icon: LucideIcon
  className?: string
}

export function HexagonalIcon({ Icon, className }: HexagonalIconProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="w-16 h-16 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="#965fd4" strokeWidth="2" />
          <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="#8bd450" strokeWidth="1" />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-8 h-8 text-[#8bd450]" />
        </div>
      </div>
    </div>
  )
}

