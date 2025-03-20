"use client"

import { useState, useEffect, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlitchEffectProps {
  children: ReactNode
  active?: boolean
  className?: string
}

export function GlitchEffect({ children, active = false, className }: GlitchEffectProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const [offset1, setOffset1] = useState({ x: 0, y: 0 })
  const [offset2, setOffset2] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (active) {
      setIsGlitching(true)
      setOffset1({
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
      })
      setOffset2({
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
      })

      const timeout = setTimeout(() => {
        setIsGlitching(false)
      }, 200)

      return () => clearTimeout(timeout)
    }
  }, [active])

  if (!isGlitching) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={cn("relative", className)}>
      {/* Original content */}
      <div className="relative z-10 mix-blend-screen">{children}</div>

      {/* Glitch layers */}
      <div
        className="absolute inset-0 text-[#965fd4] opacity-70 mix-blend-screen"
        style={{
          transform: `translate(${offset1.x}px, ${offset1.y}px)`,
          clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
        }}
      >
        {children}
      </div>

      <div
        className="absolute inset-0 text-[#8bd450] opacity-70 mix-blend-screen"
        style={{
          transform: `translate(${offset2.x}px, ${offset2.y}px)`,
          clipPath: "polygon(0 45%, 100% 45%, 100% 100%, 0 100%)",
        }}
      >
        {children}
      </div>
    </div>
  )
}

