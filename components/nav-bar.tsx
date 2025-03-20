"use client"

import { useState } from "react"
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

  const navItems = [
    { name: "INICIO", href: "/" },
    { name: "PRODUCTOS", href: "/productos" },
    { name: "NOSOTROS", href: "/sobre-nosotros" },
    { name: "CONTACTO", href: "/contacto" },
  ]

  return (
    <header className="relative z-20 bg-[#965fd4] p-4 flex justify-between items-center border-b-2 border-[#8bd450]">
      <div className="flex items-center">
        <Link href="/">
          <GlitchEffect active={glitchActive}>
            <h1 className="text-3xl font-bold tracking-wider text-white">DISTOPÍA</h1>
          </GlitchEffect>
        </Link>

        <div className="ml-8 hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-white hover:text-[#8bd450] transition-colors">
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:block">
          <div className="flex items-center space-x-2">
            <div className="w-24 h-6 bg-black/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-[#8bd450]" style={{ width: `${scanProgress}%` }} />
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
    </header>
  )
}

