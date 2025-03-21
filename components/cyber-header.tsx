"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { GlitchEffect } from "@/components/glitch-effect"

interface CyberHeaderProps {
  title: string
  subtitle?: string
  glitchActive?: boolean
}

export function CyberHeader({ title, subtitle, glitchActive = false }: CyberHeaderProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [randomGlitches, setRandomGlitches] = useState<{ x: number; y: number; width: number; height: number }[]>([])
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerDimensions, setHeaderDimensions] = useState({ width: 0, height: 0 })

  // Actualizar dimensiones del header cuando cambia el tamaño de la ventana
  useEffect(() => {
    const updateDimensions = () => {
      if (headerRef.current) {
        setHeaderDimensions({
          width: headerRef.current.offsetWidth,
          height: headerRef.current.offsetHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Efecto para generar glitches aleatorios
  useEffect(() => {
    const generateRandomGlitches = () => {
      const newGlitches = []
      const count = Math.floor(Math.random() * 5) + 3 // 3-7 glitches

      for (let i = 0; i < count; i++) {
        newGlitches.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          width: Math.random() * 30 + 10,
          height: Math.random() * 5 + 2,
        })
      }

      setRandomGlitches(newGlitches)
    }

    // Generar glitches iniciales
    generateRandomGlitches()

    // Actualizar glitches periódicamente
    const interval = setInterval(() => {
      if (Math.random() > 0.7 || glitchActive) {
        generateRandomGlitches()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [glitchActive])

  // Manejar movimiento del ratón
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect()
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
  }

  return (
    <div
      ref={headerRef}
      className="relative overflow-hidden py-16 border-b border-[#965fd4]/30"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Fondo con efecto de cuadrícula */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(139, 212, 80, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 212, 80, 0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Círculos de fondo animados */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background: isHovering
            ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(150, 95, 212, 0.8) 0%, transparent 60%)`
            : "radial-gradient(circle at 50% 50%, rgba(150, 95, 212, 0.5) 0%, transparent 60%)",
          transition: "background 0.3s ease",
        }}
      />

      {/* Líneas de escaneo horizontal */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(139, 212, 80, 0.03) 2px,
            rgba(139, 212, 80, 0.03) 4px
          )`,
        }}
      />

      {/* Glitches aleatorios */}
      {randomGlitches.map((glitch, index) => (
        <div
          key={index}
          className="absolute bg-[#965fd4] opacity-30 z-10"
          style={{
            left: `${glitch.x}%`,
            top: `${glitch.y}%`,
            width: `${glitch.width}px`,
            height: `${glitch.height}px`,
            animation: `glitchAnimation ${Math.random() * 0.5 + 0.2}s ease-in-out`,
          }}
        />
      ))}

      {/* Contenido principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          {/* Línea superior */}
          <div className="w-16 h-1 bg-[#965fd4] mb-4 relative">
            <div
              className="absolute top-0 left-0 h-full bg-[#8bd450]"
              style={{
                width: isHovering ? `${mousePosition.x}%` : "0%",
                transition: "width 0.2s ease",
              }}
            />
          </div>

          {/* Título con efecto de glitch */}
          <div className="relative">
            <GlitchEffect active={glitchActive}>
              <h1 className="text-4xl font-bold text-white text-center relative">
                {title}
                <span
                  className="absolute -inset-1 bg-[#965fd4] opacity-20 z-[-1]"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                    transform: isHovering
                      ? `perspective(500px) rotateX(${(mousePosition.y - 50) / 20}deg) rotateY(${
                          (mousePosition.x - 50) / 20
                        }deg)`
                      : "perspective(500px) rotateX(0) rotateY(0)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </h1>
            </GlitchEffect>

            {/* Efecto de "escaneo" */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8bd450]/20 to-transparent"
              style={{
                animation: "scanAnimation 3s linear infinite",
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          {/* Línea inferior */}
          <div className="w-16 h-1 bg-[#965fd4] mt-4 relative">
            <div
              className="absolute top-0 right-0 h-full bg-[#8bd450]"
              style={{
                width: isHovering ? `${100 - mousePosition.x}%` : "0%",
                transition: "width 0.2s ease",
              }}
            />
          </div>

          {/* Subtítulo */}
          {subtitle && (
            <p className="text-[#8bd450] mt-6 max-w-2xl text-center relative">
              {subtitle}
              <span
                className="absolute bottom-0 left-0 h-[1px] bg-[#8bd450]/30"
                style={{
                  width: isHovering ? "100%" : "0%",
                  transition: "width 0.8s ease",
                }}
              />
            </p>
          )}

          {/* Elementos decorativos en las esquinas */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#965fd4]/50" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#965fd4]/50" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#965fd4]/50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#965fd4]/50" />

          {/* Código binario flotante */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-[#965fd4]/10 text-xs"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `floatAnimation ${Math.random() * 10 + 10}s linear infinite`,
                }}
              >
                {Array.from({ length: Math.floor(Math.random() * 10) + 5 })
                  .map(() => (Math.random() > 0.5 ? "1" : "0"))
                  .join("")}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estilos para las animaciones */}
      <style jsx global>{`
        @keyframes scanAnimation {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes glitchAnimation {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes floatAnimation {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

