"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowRight, Mail, MapPin, Phone, User, MessageSquare, Calendar, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlitchEffect } from "@/components/glitch-effect"
import { ScanLine } from "@/components/scan-line"
import { NavBar } from "@/components/nav-bar"

export default function ContactoPage() {
  const [currentTime, setCurrentTime] = useState("")
  const [glitchActive, setGlitchActive] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [formStatus, setFormStatus] = useState("IDLE")

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

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("PROCESSING")

    // Simular envío del formulario
    setTimeout(() => {
      setFormStatus("COMPLETED")
      setTimeout(() => setFormStatus("IDLE"), 3000)
    }, 1500)
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
              <h1 className="text-4xl font-bold text-white text-center">ESTABLECER CONEXIÓN</h1>
            </GlitchEffect>
            <div className="w-16 h-1 bg-[#965fd4] mt-4"></div>
            <p className="text-[#8bd450] mt-6 max-w-2xl text-center">
              Únete a nuestra red de personas con visión de futuro. Envía tu consulta y nuestra IA procesará tu
              solicitud.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de contacto */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="relative border border-[#965fd4]/50 p-6">
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#965fd4]/50 -mt-px -mr-px"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#965fd4]/50 -mb-px -ml-px"></div>

              <h2 className="text-2xl font-bold mb-6 text-[#965fd4]">DETALLES DE CONTACTO</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 border border-[#965fd4] flex items-center justify-center">
                    <MapPin size={20} className="text-[#8bd450]" />
                  </div>
                  <div>
                    <h3 className="text-[#965fd4] text-sm mb-1">UBICACIÓN</h3>
                    <p className="text-[#8bd450]">Neo-Tokio Distrito 7, Bloque 3A</p>
                    <p className="text-[#8bd450]">Sector 9, 2089</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 border border-[#965fd4] flex items-center justify-center">
                    <Mail size={20} className="text-[#8bd450]" />
                  </div>
                  <div>
                    <h3 className="text-[#965fd4] text-sm mb-1">EMAIL</h3>
                    <p className="text-[#8bd450]">contacto@distopia-tech.net</p>
                    <p className="text-[#8bd450]">soporte@distopia-tech.net</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 border border-[#965fd4] flex items-center justify-center">
                    <Phone size={20} className="text-[#8bd450]" />
                  </div>
                  <div>
                    <h3 className="text-[#965fd4] text-sm mb-1">CANAL DE COMUNICACIÓN</h3>
                    <p className="text-[#8bd450]">+81 3 1234 5678</p>
                    <p className="text-[#8bd450]">ID: NT-7-3A-9</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-[#965fd4]/30">
                <h3 className="text-[#965fd4] text-sm mb-4">HORARIO DE OPERACIÓN</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#965fd4]">LUN - VIE</p>
                    <p className="text-[#8bd450]">09:00 - 21:00</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#965fd4]">SÁB - DOM</p>
                    <p className="text-[#8bd450]">10:00 - 18:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-[#965fd4]/30">
                <h3 className="text-[#965fd4] text-sm mb-4">ESTADO DEL SISTEMA</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#8bd450]">SERVIDOR PRINCIPAL</span>
                    <span className="text-xs text-[#8bd450]">ONLINE</span>
                  </div>
                  <div className="w-full h-1 bg-[#965fd4]/30">
                    <div className="h-full bg-[#8bd450]" style={{ width: "98%" }}></div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-[#8bd450]">RED NEURAL</span>
                    <span className="text-xs text-[#8bd450]">ACTIVA</span>
                  </div>
                  <div className="w-full h-1 bg-[#965fd4]/30">
                    <div className="h-full bg-[#8bd450]" style={{ width: "92%" }}></div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-[#8bd450]">TIEMPO DE RESPUESTA</span>
                    <span className="text-xs text-[#8bd450]">12ms</span>
                  </div>
                  <div className="w-full h-1 bg-[#965fd4]/30">
                    <div className="h-full bg-[#8bd450]" style={{ width: "95%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative border border-[#965fd4]/50 p-6">
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#965fd4]/50 -mt-px -mr-px"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#965fd4]/50 -mb-px -ml-px"></div>

              <h2 className="text-2xl font-bold mb-6 text-[#965fd4]">ENVIAR TRANSMISIÓN</h2>

              <form onSubmit={handleSubmitForm} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs text-[#965fd4]">NOMBRE</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450] pl-10"
                      placeholder="INGRESA TU IDENTIFICADOR"
                    />
                    <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#965fd4]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-[#965fd4]">EMAIL</label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450] pl-10"
                      placeholder="INGRESA TU DIRECCIÓN DE EMAIL"
                    />
                    <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#965fd4]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-[#965fd4]">ASUNTO</label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450] pl-10"
                        placeholder="ASUNTO"
                      />
                      <Tag size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#965fd4]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-[#965fd4]">FECHA</label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450] pl-10"
                      />
                      <Calendar
                        size={16}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#965fd4]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-[#965fd4]">MENSAJE</label>
                  <div className="relative">
                    <textarea
                      className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450] pl-10 min-h-[120px]"
                      placeholder="INGRESA TU MENSAJE"
                    ></textarea>
                    <MessageSquare size={16} className="absolute left-3 top-4 text-[#965fd4]" />
                  </div>
                </div>

                <button
                  type="submit"
                  className={cn(
                    "w-full bg-[#965fd4] hover:bg-[#734f9a] text-white px-6 py-3 flex items-center justify-center transition-colors",
                    formStatus === "PROCESSING" && "opacity-70 cursor-not-allowed",
                  )}
                  disabled={formStatus === "PROCESSING"}
                >
                  {formStatus === "IDLE" && (
                    <>
                      ENVIAR TRANSMISIÓN
                      <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                  {formStatus === "PROCESSING" && <>PROCESANDO...</>}
                  {formStatus === "COMPLETED" && (
                    <>
                      TRANSMISIÓN ENVIADA
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa de ubicación */}
      <section className="relative z-10 py-12 bg-[#1d1a2f]/80 border-t border-b border-[#965fd4]/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-1 bg-[#965fd4] mb-4"></div>
            <h2 className="text-2xl font-bold text-white text-center">UBICACIÓN</h2>
            <div className="w-16 h-1 bg-[#965fd4] mt-4"></div>
          </div>

          <div className="relative border-2 border-[#965fd4] p-1">
            <div className="absolute top-0 left-0 w-full h-8 bg-[#1d1a2f] flex items-center px-2 z-10">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#965fd4]"></div>
                <div className="w-3 h-3 rounded-full bg-[#8bd450]"></div>
              </div>
              <span className="text-xs text-[#965fd4] ml-4">MAPA.GEOLOCALIZACIÓN</span>
              <div className="ml-auto text-xs text-[#8bd450]">{currentTime}</div>
            </div>

            <div className="pt-8 relative">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1d1a2f]">
                {/* Mapa simulado con grid */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(150, 95, 212, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(150, 95, 212, 0.1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Líneas de coordenadas */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-0 right-0 h-px bg-[#965fd4]/20"></div>
                  <div className="absolute top-2/4 left-0 right-0 h-px bg-[#965fd4]/20"></div>
                  <div className="absolute top-3/4 left-0 right-0 h-px bg-[#965fd4]/20"></div>

                  <div className="absolute left-1/4 top-0 bottom-0 w-px bg-[#965fd4]/20"></div>
                  <div className="absolute left-2/4 top-0 bottom-0 w-px bg-[#965fd4]/20"></div>
                  <div className="absolute left-3/4 top-0 bottom-0 w-px bg-[#965fd4]/20"></div>
                </div>

                {/* Marcador de ubicación */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-16 h-16 border-2 border-[#965fd4] rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-8 h-8 bg-[#8bd450] rounded-full"></div>
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-[#8bd450] whitespace-nowrap">
                      NEO-TOKIO DISTRITO 7
                    </div>
                  </div>
                </div>

                {/* Coordenadas */}
                <div className="absolute bottom-4 left-4 text-xs text-[#965fd4]">
                  LAT: 35.6895° N<br />
                  LON: 139.6917° E
                </div>

                {/* Escala */}
                <div className="absolute bottom-4 right-4 flex items-center">
                  <div className="w-16 h-1 bg-[#965fd4]"></div>
                  <span className="text-xs text-[#965fd4] ml-2">5 KM</span>
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

            <div className="flex space-x-8 mb-6 md:mb-0">
              {[
                { name: "PRODUCTOS", href: "/productos" },
                { name: "NOSOTROS", href: "/sobre-nosotros" },
                { name: "CONTACTO", href: "/contacto" },
                { name: "SOPORTE", href: "#" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-[#8bd450] hover:text-[#965fd4] transition-colors"
                >
                  {item.name}
                </a>
              ))}
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

            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-xs text-[#8bd450]/50 hover:text-[#965fd4] transition-colors">
                POLÍTICA DE PRIVACIDAD
              </a>
              <a href="#" className="text-xs text-[#8bd450]/50 hover:text-[#965fd4] transition-colors">
                TÉRMINOS DE SERVICIO
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

