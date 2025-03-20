"use client"

import { useState, useEffect } from "react"
import { Cpu, Zap, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlitchEffect } from "@/components/glitch-effect"
import { ScanLine } from "@/components/scan-line"
import { PixelatedImage } from "@/components/pixelated-image"
import { NavBar } from "@/components/nav-bar"
import { TerminalText } from "@/components/terminal-text"

// Datos del equipo
const miembrosEquipo = [
  {
    nombre: "ANDRÓMEDA X",
    cargo: "DISEÑADOR PRINCIPAL",
    bio: "Ex ingeniero militar especializado en materiales adaptativos e interfaces neurales.",
    imagen: "/4.jpg",
  },
  {
    nombre: "CIPHER NOVA",
    cargo: "ARQUITECTO TECNOLÓGICO",
    bio: "Especialista en computación cuántica con experiencia en sistemas de integración biométrica.",
    imagen: "/5.jpg",
  },
  {
    nombre: "ECHO VERTEX",
    cargo: "LÍDER DE PRODUCCIÓN",
    bio: "Pionero en técnicas de fabricación sostenible para tejidos de alto rendimiento.",
    imagen: "/4.jpg",
  },
]

// Historia de la empresa
const historiaEmpresa = [
  {
    año: "2089",
    titulo: "FUNDACIÓN",
    descripcion:
      "DISTOPÍA emerge de las ruinas de la crisis climática con una visión singular: crear ropa adaptativa que proteja a la humanidad.",
  },
  {
    año: "2092",
    titulo: "PRIMERA COLECCIÓN",
    descripcion: "Lanzamiento de la primera línea de ropa con integración tecnológica básica y materiales reciclados.",
  },
  {
    año: "2095",
    titulo: "AVANCE NEURAL",
    descripcion:
      "Desarrollo de la primera interfaz neural integrada en prendas de vestir, revolucionando la industria.",
  },
  {
    año: "2098",
    titulo: "EXPANSIÓN GLOBAL",
    descripcion: "Apertura de instalaciones en Neo-Tokio, Nueva Europa y la Federación Americana.",
  },
  {
    año: "2101",
    titulo: "PRESENTE",
    descripcion: "Líderes en tecnomoda con más de 50 patentes y reconocimiento mundial por innovación sostenible.",
  },
]

export default function SobreNosotrosPage() {
  const [currentTime, setCurrentTime] = useState("")
  const [glitchActive, setGlitchActive] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [historiaActiva, setHistoriaActiva] = useState(0)

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

    // Avanzar automáticamente en la historia
    const historiaInterval = setInterval(() => {
      setHistoriaActiva((prev) => (prev + 1) % historiaEmpresa.length)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(glitchInterval)
      clearInterval(progressInterval)
      clearInterval(historiaInterval)
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

      {/* Encabezado de la página */}
      <section className="relative z-10 py-8 border-b border-[#965fd4]/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-1 bg-[#965fd4] mb-4"></div>
            <GlitchEffect active={glitchActive}>
              <h1 className="text-4xl font-bold text-white text-center">SOBRE DISTOPÍA</h1>
            </GlitchEffect>
            <div className="w-16 h-1 bg-[#965fd4] mt-4"></div>
            <p className="text-[#8bd450] mt-6 max-w-2xl text-center">
              Descubre nuestra historia, misión y el equipo detrás de la revolución de la tecnomoda.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de misión */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="relative border border-[#965fd4]/50 p-6">
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#965fd4]/50 -mt-px -mr-px"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#965fd4]/50 -mb-px -ml-px"></div>

              <h2 className="text-2xl font-bold mb-6 text-[#965fd4]">NUESTRA MISIÓN</h2>

              <TerminalText
                text="Fundada en 2089, DISTOPÍA surgió de las ruinas de la crisis climática con una visión singular: crear ropa adaptativa que proteja a la humanidad contra un entorno cada vez más hostil mientras mejora las capacidades humanas a través de la integración perfecta de la tecnología."
                className="text-[#8bd450] mb-6"
                typingSpeed={20}
              />

              <p className="text-[#8bd450] mb-6">
                Nuestro equipo de ingenieros, diseñadores y futuristas trabaja en la intersección de la moda y la
                tecnología, desarrollando prendas que responden tanto a las condiciones ambientales como a los datos
                biométricos del usuario.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { icon: Cpu, label: "TECNOLOGÍA" },
                  { icon: Zap, label: "POTENCIA" },
                  { icon: Layers, label: "DISEÑO" },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-12 h-12 border border-[#965fd4] rounded-full flex items-center justify-center mb-2">
                      <item.icon size={20} className="text-[#8bd450]" />
                    </div>
                    <span className="text-xs text-[#965fd4]">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-full h-px bg-[#965fd4]/30 flex-1"></div>
                <span className="text-xs text-[#965fd4]">ESTABLECIDA 2089</span>
                <div className="w-full h-px bg-[#965fd4]/30 flex-1"></div>
              </div>
            </div>

            <div className="relative border border-[#965fd4]/50 p-1 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-8 bg-[#1d1a2f] flex items-center px-2 z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#965fd4]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#8bd450]"></div>
                </div>
                <span className="text-xs text-[#965fd4] ml-4">HISTORIA.CORPORATIVA</span>
                <div className="ml-auto text-xs text-[#8bd450]">{currentTime}</div>
              </div>

              <div className="pt-8 p-4 relative">
                <div className="relative aspect-video w-full overflow-hidden mb-6">
                  <PixelatedImage
                    src="/4.jpg"
                    alt="Historia de la empresa"
                    pixelSize={2}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d1a2f] to-transparent opacity-80"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-4 h-4 bg-[#965fd4] flex items-center justify-center text-xs text-white">
                        {historiaActiva + 1}
                      </div>
                      <div className="text-xs text-[#965fd4]">{historiaEmpresa[historiaActiva].año}</div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{historiaEmpresa[historiaActiva].titulo}</h3>
                    <p className="text-[#8bd450] text-sm">{historiaEmpresa[historiaActiva].descripcion}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xs text-[#965fd4]">LÍNEA TEMPORAL</div>
                  <div className="flex space-x-2">
                    {historiaEmpresa.map((_, index) => (
                      <button
                        key={index}
                        className={cn(
                          "w-3 h-3 border",
                          historiaActiva === index
                            ? "bg-[#965fd4] border-[#965fd4]"
                            : "bg-transparent border-[#965fd4]/50",
                        )}
                        onClick={() => setHistoriaActiva(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección del equipo */}
      <section className="relative z-10 py-12 bg-[#1d1a2f]/80 border-t border-b border-[#965fd4]/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <div className="w-16 h-1 bg-[#965fd4] mb-4"></div>
            <h2 className="text-3xl font-bold text-white text-center">NUESTRO EQUIPO</h2>
            <div className="w-16 h-1 bg-[#965fd4] mt-4"></div>
            <p className="text-[#8bd450] mt-6 max-w-2xl text-center">
              Conoce a las mentes brillantes detrás de nuestras innovaciones tecnológicas y diseños revolucionarios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {miembrosEquipo.map((miembro, index) => (
              <div key={index} className="border border-[#965fd4]/50 p-6 relative">
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#965fd4]/50 -mt-px -mr-px"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#965fd4]/50 -mb-px -ml-px"></div>

                <div className="w-24 h-24 border-2 border-[#965fd4] overflow-hidden mb-6 mx-auto">
                  <PixelatedImage
                    src={miembro.imagen}
                    alt={miembro.nombre}
                    pixelSize={2}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold mb-2 text-[#965fd4] text-center">{miembro.nombre}</h3>
                <div className="text-xs text-[#8bd450] mb-4 text-center">{miembro.cargo}</div>

                <p className="text-sm text-[#8bd450]/80 mb-6 text-center">{miembro.bio}</p>

                <div className="flex justify-center">
                  <div className="w-16 h-1 bg-[#965fd4]/30"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de valores */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <div className="w-16 h-1 bg-[#965fd4] mb-4"></div>
            <h2 className="text-3xl font-bold text-white text-center">NUESTROS VALORES</h2>
            <div className="w-16 h-1 bg-[#965fd4] mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                titulo: "INNOVACIÓN",
                descripcion:
                  "Constantemente desafiamos los límites de lo posible, fusionando tecnología y diseño de formas nunca antes vistas.",
              },
              {
                titulo: "SOSTENIBILIDAD",
                descripcion:
                  "Cada producto está diseñado pensando en el impacto ambiental, utilizando materiales reciclados y procesos de bajo consumo.",
              },
              {
                titulo: "FUNCIONALIDAD",
                descripcion:
                  "Nuestras prendas no solo son estéticamente impresionantes, sino que ofrecen funcionalidades que mejoran la vida diaria.",
              },
              {
                titulo: "COMUNIDAD",
                descripcion:
                  "Creemos en el poder de la comunidad para impulsar el cambio y la innovación en la industria de la moda.",
              },
            ].map((valor, index) => (
              <div key={index} className="border border-[#965fd4]/50 p-6 relative">
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#965fd4]/50 -mt-px -mr-px"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[#965fd4]/50 -mb-px -ml-px"></div>

                <div className="w-12 h-12 border border-[#965fd4] flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-[#8bd450]">{index + 1}</span>
                </div>

                <h3 className="text-xl font-bold mb-4 text-[#965fd4] text-center">{valor.titulo}</h3>
                <p className="text-sm text-[#8bd450]/80 text-center">{valor.descripcion}</p>
              </div>
            ))}
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

