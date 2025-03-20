"use client"

import { useEffect, useRef } from "react"

interface PixelatedImageProps {
  src: string
  alt: string
  pixelSize?: number
  className?: string
}

export function PixelatedImage({ src, alt, pixelSize = 5, className }: PixelatedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = src

    img.onload = () => {
      // Set canvas dimensions
      canvas.width = img.width
      canvas.height = img.height

      // Draw original image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Pixelate
      const w = canvas.width
      const h = canvas.height

      // Get image data
      const imgData = ctx.getImageData(0, 0, w, h)

      // Clear canvas
      ctx.clearRect(0, 0, w, h)

      // Redraw pixelated
      for (let y = 0; y < h; y += pixelSize) {
        for (let x = 0; x < w; x += pixelSize) {
          // Get pixel color at center of pixelSize block
          const pixelIndex = (Math.floor(y + pixelSize / 2) * w + Math.floor(x + pixelSize / 2)) * 4

          // Apply a slight green/purple tint to match the cyberpunk theme
          const r = imgData.data[pixelIndex]
          const g = imgData.data[pixelIndex + 1] * 1.1 // Boost green slightly
          const b = imgData.data[pixelIndex + 2] * 1.05 // Boost blue slightly
          const a = imgData.data[pixelIndex + 3]

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`
          ctx.fillRect(x, y, pixelSize, pixelSize)
        }
      }

      // Add scan lines
      ctx.fillStyle = "rgba(139, 212, 80, 0.1)"
      for (let y = 0; y < h; y += 2) {
        ctx.fillRect(0, y, w, 1)
      }

      // Add grid overlay
      ctx.strokeStyle = "rgba(139, 212, 80, 0.2)"
      ctx.lineWidth = 0.5

      for (let x = 0; x < w; x += 10) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }

      for (let y = 0; y < h; y += 10) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
    }
  }, [src, pixelSize])

  return <canvas ref={canvasRef} className={className} aria-label={alt} />
}

