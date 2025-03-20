"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TerminalTextProps {
  text: string
  className?: string
  typingSpeed?: number
  initialDelay?: number
}

export function TerminalText({ text, className, typingSpeed = 50, initialDelay = 0 }: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (initialDelay > 0) {
      timeout = setTimeout(() => {
        startTyping()
      }, initialDelay)
    } else {
      startTyping()
    }

    function startTyping() {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.substring(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
          setIsTyping(false)
        }
      }, typingSpeed)

      return () => clearInterval(interval)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [text, typingSpeed, initialDelay])

  return (
    <div className={cn("font-mono", className)}>
      {displayedText}
      {isTyping && <span className="inline-block w-2 h-4 bg-[#8bd450] ml-1 animate-pulse" />}
    </div>
  )
}

