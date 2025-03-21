"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Lock, Menu, X, LogOut, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlitchEffect } from "@/components/glitch-effect"
import { Cart } from "@/components/cart"
import { useAuth } from "@/contexts/auth-context"

interface NavBarProps {
  currentTime: string
  glitchActive: boolean
  scanProgress: number
}

export function NavBar({ currentTime, glitchActive, scanProgress }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const [randomGlitches, setRandomGlitches] = useState<{ x: number; y: number; width: number; height: number }[]>([])

  const navItems = [
    { name: "INICIO", href: "/" },
    { name: "PRODUCTOS", href: "/productos" },
    { name: "NOSOTROS", href: "/sobre-nosotros" },
    { name: "CONTACTO", href: "/contacto" },
  ]

  // Efecto para generar glitches aleatorios
  useEffect(() => {
    const generateRandomGlitches = () => {
      const newGlitches = []
      const count = Math.floor(Math.random() * 3) + 1 // 1-3 glitches

      for (let i = 0; i < count; i++) {
        newGlitches.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          width: Math.random() * 20 + 5,
          height: Math.random() * 3 + 1,
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
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect()
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
  }

  return (
    <header
      ref={navRef}
      className="relative z-20 bg-gradient-to-r from-[#965fd4] to-[#734f9a] p-4 flex justify-between items-center border-b-2 border-[#8bd450] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Efecto de gradiente interactivo */}
      <div
        className="absolute inset-0 z-0 opacity-60 transition-opacity duration-300"
        style={{
          background: isHovering
            ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 212, 80, 0.4) 0%, transparent 70%)`
            : "none",
        }}
      />

      {/* Líneas de escaneo horizontal */}
      <div
        className="absolute inset-0 z-0 overflow-hidden opacity-20"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(139, 212, 80, 0.2) 2px,
            rgba(139, 212, 80, 0.2) 4px
          )`,
        }}
      />

      {/* Glitches aleatorios */}
      {randomGlitches.map((glitch, index) => (
        <div
          key={index}
          className="absolute bg-[#8bd450] opacity-30 z-10"
          style={{
            left: `${glitch.x}%`,
            top: `${glitch.y}%`,
            width: `${glitch.width}px`,
            height: `${glitch.height}px`,
            animation: `glitchAnimation ${Math.random() * 0.5 + 0.2}s ease-in-out`,
          }}
        />
      ))}

      {/* Línea de escaneo vertical */}
      <div
        className="absolute h-full w-[2px] bg-[#8bd450]/30 z-10"
        style={{
          left: `${scanProgress}%`,
          boxShadow: "0 0 8px 2px rgba(139, 212, 80, 0.3)",
        }}
      />

      <div className="flex items-center relative z-10">
        <Link href="/">
          <GlitchEffect active={glitchActive}>
            <h1 className="text-3xl font-bold tracking-wider text-white">DISTOPÍA</h1>
          </GlitchEffect>
        </Link>

        <div className="ml-8 hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white hover:text-[#8bd450] transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8bd450] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4 relative z-10">
        <div className="hidden md:block">
          <div className="flex items-center space-x-2">
            <div className="w-24 h-6 bg-black/30 relative overflow-hidden border border-[#8bd450]/30">
              <div className="absolute top-0 left-0 h-full bg-[#8bd450]" style={{ width: `${scanProgress}%` }} />
              <div
                className="absolute top-0 left-0 h-full w-full opacity-30"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(139, 212, 80, 0.5) 50%, transparent 100%)",
                  transform: "translateX(-100%)",
                  animation: "scanAnimation 2s linear infinite",
                }}
              />
            </div>
            <span className="text-xs text-white">SEÑAL {scanProgress}%</span>
          </div>
        </div>

        {/* Carrito de compras */}
        <Cart />

        {/* Estado de autenticación */}
        {isAuthenticated ? (
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <User size={16} />
              <span className="text-sm">{user?.displayName}</span>
            </div>

            <button
              onClick={logout}
              className="text-white hover:text-[#8bd450] transition-colors"
              title="Cerrar sesión"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="hidden md:flex items-center space-x-2 text-white hover:text-[#8bd450] transition-colors"
          >
            <Lock size={16} />
            <span className="text-sm">INICIAR SESIÓN</span>
          </Link>
        )}

        {/* Botón de menú móvil */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil */}
      <div
        className={cn(
          "absolute top-full left-0 right-0 bg-[#1d1a2f] border-b border-[#965fd4] md:hidden transition-transform duration-300 z-50",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="p-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-[#8bd450] hover:text-[#965fd4] py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Opciones de autenticación para móvil */}
          {isAuthenticated ? (
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center text-[#8bd450]">
                <User size={16} className="mr-2" />
                <span>{user?.displayName}</span>
              </div>

              <button
                onClick={() => {
                  logout()
                  setMobileMenuOpen(false)
                }}
                className="text-[#965fd4] hover:text-[#8bd450] transition-colors"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center text-[#8bd450] hover:text-[#965fd4] py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Lock size={16} className="mr-2" />
              <span>INICIAR SESIÓN</span>
            </Link>
          )}

          <div className="pt-4 border-t border-[#965fd4]/30 flex items-center justify-between">
            <span className="text-xs text-[#965fd4]">HORA DEL SISTEMA</span>
            <span className="text-xs text-[#8bd450]">{currentTime}</span>
          </div>
        </div>
      </div>

      {/* Línea de borde inferior con efecto de gradiente */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 z-10"
        style={{
          background: isHovering
            ? `linear-gradient(90deg, transparent, rgba(139, 212, 80, 0.8) ${mousePosition.x}%, transparent)`
            : "linear-gradient(90deg, transparent, rgba(139, 212, 80, 0.5) 50%, transparent)",
          transition: "background 0.3s ease",
        }}
      />
    </header>
  )
}

