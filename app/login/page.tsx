"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, User, AlertTriangle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlitchEffect } from "@/components/glitch-effect"
import { ScanLine } from "@/components/scan-line"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [glitchActive, setGlitchActive] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

  const { login, error, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  // Actualiza la hora y crea efectos de glitch aleatorios
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const seconds = now.getSeconds().toString().padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    // Efecto de glitch aleatorio
    const glitchInterval = setInterval(() => {
      const shouldGlitch = Math.random() > 0.7
      if (shouldGlitch) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      }
    }, 3000)

    // Animación de la barra de progreso
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 1
      })
    }, 100)

    return () => {
      clearInterval(interval)
      clearInterval(glitchInterval)
      clearInterval(progressInterval)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(username, password)
  }

  return (
    <div className="min-h-screen bg-[#1d1a2f] text-[#8bd450] font-mono relative overflow-hidden">
      {/* Fondo de cuadrícula */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(139, 212, 80, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 212, 80, 0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Efecto de línea de escaneo */}
      <ScanLine />

      {/* Encabezado */}
      <header className="relative z-20 bg-[#965fd4] p-4 flex justify-between items-center border-b-2 border-[#8bd450]">
        <Link href="/">
          <GlitchEffect active={glitchActive}>
            <h1 className="text-3xl font-bold tracking-wider text-white">DISTOPÍA</h1>
          </GlitchEffect>
        </Link>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-24 h-6 bg-black/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-[#8bd450]" style={{ width: `${scanProgress}%` }} />
            </div>
            <span className="text-xs text-white">SEÑAL {scanProgress}%</span>
          </div>

          <div className="text-white text-sm">{currentTime}</div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-76px)] p-4">
        <div className="w-full max-w-md">
          <div className="border border-[#965fd4] relative">
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#965fd4] -mt-px -mr-px"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#965fd4] -mb-px -ml-px"></div>

            {/* Encabezado del formulario */}
            <div className="bg-[#965fd4] p-4">
              <GlitchEffect active={glitchActive}>
                <h2 className="text-xl font-bold text-white">INICIAR SESIÓN</h2>
              </GlitchEffect>
              <div className="text-xs text-white/70 mt-1">ACCESO AL SISTEMA</div>
            </div>

            {/* Formulario */}
            <div className="p-6">
              <div className="mb-6 flex items-center">
                <div className="w-2 h-2 bg-[#965fd4] mr-2"></div>
                <div className="text-xs text-[#965fd4]">ESTADO: ESPERANDO AUTENTICACIÓN</div>
              </div>

              {error && (
                <div className="mb-6 border border-[#965fd4] bg-[#965fd4]/10 p-4 flex items-start">
                  <AlertTriangle size={20} className="text-[#965fd4] mr-3 mt-0.5" />
                  <div>
                    <div className="text-[#965fd4] font-bold">ERROR DE AUTENTICACIÓN</div>
                    <div className="text-[#8bd450] text-sm mt-1">{error}</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs text-[#965fd4]">IDENTIFICADOR</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450] pl-10"
                      placeholder="INGRESA TU USUARIO"
                      required
                    />
                    <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#965fd4]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-[#965fd4]">CONTRASEÑA</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450] pl-10 pr-10"
                      placeholder="INGRESA TU CONTRASEÑA"
                      required
                    />
                    <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#965fd4]" />

                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#965fd4] hover:text-[#8bd450]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 border border-[#965fd4] bg-transparent focus:ring-[#8bd450]"
                    />
                    <label htmlFor="remember" className="text-xs text-[#8bd450] ml-2">
                      RECORDAR SESIÓN
                    </label>
                  </div>

                  <Link href="#" className="text-xs text-[#965fd4] hover:text-[#8bd450]">
                    ¿OLVIDASTE TU CONTRASEÑA?
                  </Link>
                </div>

                <button
                  type="submit"
                  className={cn(
                    "w-full bg-[#965fd4] hover:bg-[#734f9a] text-white px-6 py-3 flex items-center justify-center transition-colors",
                    isLoading && "opacity-70 cursor-not-allowed",
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-pulse mr-2">VERIFICANDO</div>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <>
                      INICIAR SESIÓN
                      <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-[#965fd4]/30">
                <div className="text-xs text-[#965fd4] mb-2">INFORMACIÓN DE ACCESO</div>
                <div className="text-xs text-[#8bd450]">
                  Para acceder al sistema, utiliza las siguientes credenciales:
                  <br />
                  Usuario: <span className="text-[#965fd4]">admin</span>
                  <br />
                  Contraseña: <span className="text-[#965fd4]">admin</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-[#8bd450] hover:text-[#965fd4]">
              VOLVER A LA PÁGINA PRINCIPAL
            </Link>
          </div>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="relative z-10 bg-[#1d1a2f] border-t border-[#965fd4]/30 py-4 text-center">
        <div className="text-xs text-[#8bd450]/50">&copy; 2024 INDUSTRIAS DISTOPÍA. TODOS LOS DERECHOS RESERVADOS.</div>
      </footer>
    </div>
  )
}

