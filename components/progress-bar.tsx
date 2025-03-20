import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
}

export function ProgressBar({ value, max = 100, className }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={cn("h-2 bg-[#1d1a2f] border border-[#965fd4]/30 relative overflow-hidden", className)}>
      <div className="h-full bg-[#965fd4]" style={{ width: `${percentage}%` }} />

      {/* Tick marks */}
      <div className="absolute inset-0 flex justify-between px-0.5">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-px h-full bg-[#8bd450]/20" />
        ))}
      </div>
    </div>
  )
}

