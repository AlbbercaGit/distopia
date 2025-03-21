"use client"

import { useState, useEffect, useRef } from "react"

interface PixelatedImageProps {
  src: string
  alt: string
  pixelSize?: number
  className?: string
  priority?: boolean
}

export function PixelatedImage({ src, alt, pixelSize = 2, className = "", priority = false }: PixelatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const hasAttemptedLoadRef = useRef<{ [key: string]: boolean }>({})

  // Función para determinar si la imagen está en el viewport
  const isInViewport = () => {
    if (!imageRef.current) return false
    const rect = imageRef.current.getBoundingClientRect()
    return (
      rect.top >= -rect.height &&
      rect.left >= -rect.width &&
      rect.bottom <= window.innerHeight + rect.height &&
      rect.right <= window.innerWidth + rect.width
    )
  }

  useEffect(() => {
    // Resetear el estado cuando cambia la fuente
    setIsLoaded(false)
    setError(false)
    hasAttemptedLoadRef.current[src] = false
  }, [src])

  useEffect(() => {
    // Asegurarse de que estamos en el cliente
    if (typeof window === "undefined") return

    // Comprobar si la imagen está en el viewport para precargarla
    const checkVisibility = () => {
      if (isInViewport() && !isLoaded && !error && !hasAttemptedLoadRef.current[src]) {
        // Marcar que ya hemos intentado cargar esta imagen
        hasAttemptedLoadRef.current[src] = true

        // Usamos el constructor global de Image del navegador
        const imgElement = new window.Image()
        imgElement.crossOrigin = "anonymous"
        imgElement.onload = () => setIsLoaded(true)
        imgElement.onerror = () => setError(true)
        imgElement.src = src
      }
    }

    // Comprobar inmediatamente y luego en cada scroll
    checkVisibility()

    const handleScroll = () => {
      if (!isLoaded && !error) {
        checkVisibility()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [src, isLoaded, error])

  // Generar un color aleatorio para el placeholder basado en el src
  const getPlaceholderColor = () => {
    let hash = 0
    for (let i = 0; i < src.length; i++) {
      hash = src.charCodeAt(i) + ((hash << 5) - hash)
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase()
    return `#${"00000".substring(0, 6 - c.length)}${c}`
  }

  const placeholderColor = getPlaceholderColor()

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder con color generado */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-[#1d1a2f] animate-pulse flex items-center justify-center"
          style={{
            background: `linear-gradient(45deg, ${placeholderColor}33, #1d1a2f)`,
          }}
        >
          <div className="w-8 h-8 border-2 border-[#965fd4] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Imagen real con efecto pixelado */}
      <img
        ref={imageRef}
        src={src || "/placeholder.svg"}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{
          imageRendering: "pixelated",
          filter: `blur(${pixelSize / 2}px)`,
        }}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  )
}

