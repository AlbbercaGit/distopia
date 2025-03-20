"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Shield, Clock, Settings, LogOut } from "lucide-react"
import { GlitchEffect } from "@/components/glitch-effect"
import { ScanLine } from "@/components/scan-line"
import { NavBar } from "@/components/nav-bar"
import { useAuth } from "@/contexts/auth-context"

export default function PerfilPage() {
  const [currentTime, setCurrentTime] = useState("")
  const [glitchActive, setGlitchActive] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
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

  if (!isAuthenticated) {
    return null // No renderizar nada mientras redirige
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

      {/* Barra de navegación */}
      <NavBar currentTime={currentTime} glitchActive={glitchActive} scanProgress={scanProgress} />

      {/* Encabezado de la página */}
      <section className="relative z-10 py-8 border-b border-[#965fd4]/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-1 bg-[#965fd4] mb-4"></div>
            <GlitchEffect active={glitchActive}>
              <h1 className="text-4xl font-bold text-white text-center">PERFIL DE USUARIO</h1>
            </GlitchEffect>
            <div className="w-16 h-1 bg-[#965fd4] mt-4"></div>
            <p className="text-[#8bd450] mt-6 max-w-2xl text-center">
              Gestiona tu cuenta y accede a tus datos personales.
            </p>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Panel de usuario */}
            <div className="lg:col-span-1">
              <div className="border border-[#965fd4]/50 p-6 relative">
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#965fd4]/50 -mt-px -mr-px"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#965fd4]/50 -mb-px -ml-px"></div>

                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 border-2 border-[#965fd4] rounded-full flex items-center justify-center mb-6">
                    <User size={40} className="text-[#965fd4]" />
                  </div>

                  <h2 className="text-xl font-bold text-[#965fd4] mb-2">{user?.displayName}</h2>
                  <div className="text-sm text-[#8bd450] mb-4">@{user?.username}</div>

                  <div className="flex items-center space-x-2 mb-6">
                    <div className="px-3 py-1 bg-[#965fd4]/20 border border-[#965fd4] text-[#965fd4] text-xs">
                      {user?.role.toUpperCase()}
                    </div>
                    <div className="px-3 py-1 bg-[#8bd450]/20 border border-[#8bd450] text-[#8bd450] text-xs">
                      ACTIVO
                    </div>
                  </div>

                  <button
                    onClick={logout}
                    className="w-full bg-[#965fd4] hover:bg-[#734f9a] text-white px-4 py-2 flex items-center justify-center transition-colors"
                  >
                    CERRAR SESIÓN
                    <LogOut size={16} className="ml-2" />
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-[#965fd4]/30">
                  <div className="text-xs text-[#965fd4] mb-4">ESTADÍSTICAS DE USUARIO</div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Clock size={16} className="text-[#8bd450] mr-3" />
                      <div>
                        <div className="text-xs text-[#965fd4]">ÚLTIMO ACCESO</div>
                        <div className="text-sm text-[#8bd450]">{new Date().toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Shield size={16} className="text-[#8bd450] mr-3" />
                      <div>
                        <div className="text-xs text-[#965fd4]">NIVEL DE ACCESO</div>
                        <div className="text-sm text-[#8bd450]">NIVEL 5 - ADMINISTRADOR</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel principal */}
            <div className="lg:col-span-2">
              <div className="border border-[#965fd4]/50 p-6 relative">
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#965fd4]/50 -mt-px -mr-px"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#965fd4]/50 -mb-px -ml-px"></div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#965fd4] mb-4">PANEL DE CONTROL</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-[#965fd4]/30 p-4">
                      <div className="text-xs text-[#965fd4] mb-2">PEDIDOS RECIENTES</div>
                      <div className="text-2xl font-bold text-[#8bd450]">0</div>
                      <div className="text-xs text-[#8bd450]/70 mt-1">No hay pedidos recientes</div>
                    </div>

                    <div className="border border-[#965fd4]/30 p-4">
                      <div className="text-xs text-[#965fd4] mb-2">PRODUCTOS GUARDADOS</div>
                      <div className="text-2xl font-bold text-[#8bd450]">0</div>
                      <div className="text-xs text-[#8bd450]/70 mt-1">No hay productos guardados</div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#965fd4] mb-4">CONFIGURACIÓN</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-[#965fd4]/30 hover:bg-[#965fd4]/5 cursor-pointer transition-colors">
                      <div className="flex items-center">
                        <Settings size={16} className="text-[#8bd450] mr-3" />
                        <div className="text-[#8bd450]">Configuración de la cuenta</div>
                      </div>
                      <div className="text-[#965fd4]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-[#965fd4]/30 hover:bg-[#965fd4]/5 cursor-pointer transition-colors">
                      <div className="flex items-center">
                        <Shield size={16} className="text-[#8bd450] mr-3" />
                        <div className="text-[#8bd450]">Seguridad y privacidad</div>
                      </div>
                      <div className="text-[#965fd4]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#965fd4]/30">
                  <div className="text-xs text-[#965fd4] mb-4">INFORMACIÓN DEL SISTEMA</div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-[#965fd4]">ID DE USUARIO</div>
                      <div className="text-[#8bd450]">USR-ADM-001</div>
                    </div>

                    <div>
                      <div className="text-[#965fd4]">VERSIÓN DEL SISTEMA</div>
                      <div className="text-[#8bd450]">v2.5.7</div>
                    </div>

                    <div>
                      <div className="text-[#965fd4]">ÚLTIMO INICIO DE SESIÓN</div>
                      <div className="text-[#8bd450]">{new Date().toLocaleString()}</div>
                    </div>

                    <div>
                      <div className="text-[#965fd4]">ESTADO DE LA RED</div>
                      <div className="text-[#8bd450]">CONECTADO</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="relative z-10 bg-[#1d1a2f] border-t border-[#965fd4]/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-[#965fd4]">DISTOPÍA</h3>
              <p className="text-xs text-[#8bd450]/70 mt-2">SISTEMAS DE MEJORA CIBERNÉTICA</p>
            </div>

            <div className="text-right">
              <div className="text-xs text-[#965fd4]">IP.AXIS.INDUSTRIAL.STUDIO</div>
              <div className="text-xs text-[#8bd450] mt-1">{currentTime}</div>
              <div className="text-xs text-[#8bd450] mt-1">24/04/2024</div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#965fd4]/20 flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs text-[#8bd450]/50">
              &copy; 2024 INDUSTRIAS DISTOPÍA. TODOS LOS DERECHOS RESERVADOS.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

