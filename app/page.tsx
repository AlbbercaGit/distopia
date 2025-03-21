"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ChevronRight, Download, ExternalLink, Eye, Play, Scan, Shield } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { GlitchEffect } from "@/components/glitch-effect"
import { ScanLine } from "@/components/scan-line"
import { PixelatedImage } from "@/components/pixelated-image"
import { ProgressBar } from "@/components/progress-bar"
import { HexagonalIcon } from "@/components/hexagonal-icon"
import { NavBar } from "@/components/nav-bar"

// Define la paleta de colores
const colors = {
  darkPurple: "#1d1a2f",
  green: "#3f6d4e",
  lightGreen: "#8bd450",
  purple: "#965fd4",
  mediumPurple: "#734f9a",
}

export default function LandingPage() {
  const [currentTime, setCurrentTime] = useState("")
  const [glitchActive, setGlitchActive] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

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

      {/* Sección principal del héroe */}
      <section className="relative z-10 border-b border-[#965fd4]/30">
        <div className="container mx-auto p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex items-center">
                <div className="w-12 h-1 bg-[#965fd4]"></div>
                <span className="ml-2 text-[#965fd4] text-sm">SISTEMA.INICIO</span>
              </div>

              <GlitchEffect active={glitchActive}>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                  EVOLUCIÓN <span className="text-[#965fd4]">TECNO</span>MODA
                </h2>
              </GlitchEffect>

              <p className="text-[#8bd450] mb-8 max-w-md">
                El futuro de la moda está aquí. Nuestras mejoras cibernéticas e integraciones digitales redefinen los
                límites entre humano y máquina. Únete a la revolución.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/productos"
                  className="bg-[#965fd4] hover:bg-[#734f9a] text-white px-6 py-3 flex items-center justify-center transition-colors"
                >
                  EXPLORAR COLECCIÓN
                  <ChevronRight size={16} className="ml-2" />
                </Link>

                <button className="border border-[#8bd450] hover:bg-[#3f6d4e]/20 px-6 py-3 flex items-center justify-center transition-colors">
                  ESPECIFICACIONES
                  <Download size={16} className="ml-2" />
                </button>
              </div>
            </div>

            <div className="relative border-2 border-[#965fd4] p-1">
              <div className="absolute top-0 left-0 w-full h-8 bg-[#1d1a2f] flex items-center px-2 z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#965fd4]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#8bd450]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#3f6d4e]"></div>
                </div>
                <span className="text-xs text-[#965fd4] ml-4">VÍCTIMAS DEL EXPLOIT</span>
                <div className="ml-auto text-xs text-[#8bd450]">{currentTime}</div>
              </div>

              <div className="pt-8 relative">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <PixelatedImage
                    src="https://raw.githubusercontent.com/AlbbercaGit/distopia/refs/heads/main/public/4.jpg"
                    alt="Escena cyberpunk"
                    pixelSize={1}
                    className="w-full h-full object-cover"
                  />

                  {/* Elementos superpuestos */}
                  <div className="absolute top-4 right-4 flex flex-col items-end">
                    <div className="text-xs text-[#965fd4] mb-1">20 — 21</div>
                    <div className="w-6 h-12 border border-[#965fd4] flex flex-col">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-2 border-b border-[#965fd4]/30"></div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <div className="text-xs text-[#8bd450]">IZQ</div>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-[#8bd450]"></div>
                    ))}
                    <div className="w-16 flex justify-between">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-[#8bd450]"></div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                    <div className="w-16 flex justify-between">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-[#8bd450]"></div>
                      ))}
                    </div>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-[#8bd450]"></div>
                    ))}
                    <div className="text-xs text-[#8bd450]">DER</div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#965fd4] flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4">
                      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 2V22M2 12H22"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-white">DISTOPÍA</span>
                    <div className="w-8 h-1 bg-white"></div>
                    <div className="w-8 h-1 bg-white"></div>
                    <span className="text-xs text-white">DISTOPÍA</span>
                    <div className="w-4 h-4">
                      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 2V22M2 12H22"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de características */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <div className="w-16 h-1 bg-[#965fd4] mb-4"></div>
            <h2 className="text-3xl font-bold text-white text-center">CARACTERÍSTICAS PRINCIPALES</h2>
            <div className="w-16 h-1 bg-[#965fd4] mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "INTERFAZ NEURAL",
                description:
                  "Interfaz cerebro-computadora directa con retroalimentación háptica avanzada y aumento sensorial.",
                icon: Eye,
              },
              {
                title: "ARMADURA ADAPTATIVA",
                description: "Nano-tejido autoreparable con regulación térmica y resistencia a impactos.",
                icon: Shield,
              },
              {
                title: "SINCRONIZACIÓN BIOMÉTRICA",
                description: "Sistemas de monitoreo de salud en tiempo real y optimización del rendimiento.",
                icon: Scan,
              },
            ].map((feature, index) => (
              <div key={index} className="border border-[#965fd4]/50 p-6 relative">
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#965fd4]/50 -mt-px -mr-px"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#965fd4]/50 -mb-px -ml-px"></div>

                <HexagonalIcon Icon={feature.icon} className="mb-6" />

                <h3 className="text-xl font-bold mb-4 text-[#965fd4]">{feature.title}</h3>
                <p className="text-sm text-[#8bd450]/80 mb-6">{feature.description}</p>

                <div className="flex items-center space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-6 h-6 border border-[#8bd450]/50 flex items-center justify-center">
                      <div
                        className={cn("w-3 h-3", i < 3 ? "bg-[#8bd450]" : "bg-transparent border border-[#8bd450]/50")}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Muestra de producto */}
      <section className="relative z-10 py-12 bg-[#1d1a2f]/80 border-t border-b border-[#965fd4]/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex items-center">
                <div className="w-12 h-1 bg-[#965fd4]"></div>
                <span className="ml-2 text-[#965fd4] text-sm">PRODUCTO.DESTACADO</span>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-white">LA TIERRA NO CONTINUARÁ OFRECIENDO SU COSECHA</h2>

              <p className="text-[#8bd450] mb-8">
                Nuestra última colección integra tecnología avanzada con materiales sostenibles. Cada pieza está
                diseñada para mejorar las capacidades humanas mientras minimiza el impacto ambiental.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { label: "DURABILIDAD", value: 85 },
                  { label: "INTEGRACIÓN", value: 92 },
                  { label: "ADAPTABILIDAD", value: 78 },
                  { label: "RESISTENCIA", value: 88 },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-32 text-xs text-[#965fd4]">{stat.label}</div>
                    <ProgressBar value={stat.value} className="flex-1" />
                    <div className="ml-4 text-xs text-[#8bd450]">{stat.value}%</div>
                  </div>
                ))}
              </div>

              <Link
                href="/productos"
                className="bg-[#965fd4] hover:bg-[#734f9a] text-white px-6 py-3 flex items-center justify-center transition-colors w-full md:w-auto"
              >
                VER COLECCIÓN
                <ExternalLink size={16} className="ml-2" />
              </Link>
            </div>

            <div className="relative border-2 border-[#965fd4] p-1">
              <div className="absolute top-0 left-0 w-full h-8 bg-[#1d1a2f] flex items-center px-2 z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#965fd4]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#8bd450]"></div>
                </div>
                <span className="text-xs text-[#965fd4] ml-4">ESCANEO_PRODUCTO.EXE</span>
                <div className="ml-auto text-xs text-[#8bd450]">{currentTime}</div>
              </div>

              <div className="pt-8 relative">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <PixelatedImage
                    src="https://raw.githubusercontent.com/AlbbercaGit/distopia/refs/heads/main/public/5.jpg"
                    alt="Muestra de producto"
                    pixelSize={1}
                    className="w-full h-full object-cover"
                  />

                  {/* Elementos superpuestos */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-2 border-[#965fd4] rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-24 h-24 border border-[#8bd450] rounded-full flex items-center justify-center">
                        <Play size={24} className="text-[#8bd450] ml-2" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs text-[#965fd4] mb-1">CONFIRMACIÓN IDENT</div>
                    <div className="w-full h-1 bg-[#965fd4]/30">
                      <div className="h-full bg-[#965fd4]" style={{ width: `${scanProgress}%` }}></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <div className="text-xs text-[#8bd450]">NO-FBAT1527</div>
                      <div className="text-xs text-[#8bd450]">DE 110 MM 33 DR 3</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Llamada a la acción */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <GlitchEffect active={glitchActive}>
              <h2 className="text-4xl font-bold mb-6 text-white">
                ÚNETE A LA <span className="text-[#965fd4]">REVOLUCIÓN</span>
              </h2>
            </GlitchEffect>

            <p className="text-[#8bd450] mb-8">
              Suscríbete a nuestra red y recibe acceso exclusivo a lanzamientos de edición limitada, actualizaciones
              tecnológicas y eventos comunitarios.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-0 max-w-md mx-auto">
              <input
                type="email"
                placeholder="INGRESA.TU.EMAIL"
                className="bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450] flex-1"
              />
              <button className="bg-[#965fd4] hover:bg-[#734f9a] text-white px-6 py-3 flex items-center justify-center transition-colors">
                SUSCRIBIRSE
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="text-xs text-[#965fd4] border border-[#965fd4] px-4 py-2">
                EXCEPTO CON ADMINISTRACIÓN FIEL
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

            <div className="flex space-x-8 mb-6 md:mb-0">
              {[
                { name: "PRODUCTOS", href: "/productos" },
                { name: "TECNOLOGÍA", href: "#" },
                { name: "SOPORTE", href: "#" },
                { name: "COMUNIDAD", href: "#" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-[#8bd450] hover:text-[#965fd4] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke="#965fd4" strokeWidth="1" />
                    <path d="M50 20 L80 50 L50 80 L20 50 Z" fill="none" stroke="#8bd450" strokeWidth="1" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="#965fd4" strokeWidth="1" />
                    <circle cx="50" cy="50" r="5" fill="#8bd450" />
                  </svg>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-[#965fd4]">IP.AXIS.INDUSTRIAL.STUDIO</div>
                <div className="text-xs text-[#8bd450] mt-1">{currentTime}</div>
                <div className="text-xs text-[#8bd450] mt-1">24/04/2024</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#965fd4]/20 flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs text-[#8bd450]/50">
              &copy; 2024 INDUSTRIAS DISTOPÍA. TODOS LOS DERECHOS RESERVADOS.
            </div>

            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-xs text-[#8bd450]/50 hover:text-[#965fd4] transition-colors">
                POLÍTICA DE PRIVACIDAD
              </Link>
              <Link href="#" className="text-xs text-[#8bd450]/50 hover:text-[#965fd4] transition-colors">
                TÉRMINOS DE SERVICIO
              </Link>
              <Link href="#" className="text-xs text-[#8bd450]/50 hover:text-[#965fd4] transition-colors">
                POLÍTICA DE COOKIES
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

