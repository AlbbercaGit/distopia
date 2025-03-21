"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, Filter, X, Search } from "lucide-react"
import Link from "next/link"
import { cn, getBasePath } from "@/lib/utils"
import { GlitchEffect } from "@/components/glitch-effect"
import { ScanLine } from "@/components/scan-line"
import { PixelatedImage } from "@/components/pixelated-image"
import { ProgressBar } from "@/components/progress-bar"
import { NavBar } from "@/components/nav-bar"
import { useCart } from "@/contexts/cart-context"

// Datos de productos
const productos = [
  // Camisetas - Hombre
  {
    id: "001",
    nombre: "CAMISETA NEURO-SYNC",
    codigo: "NS-C-001-NG",
    precio: 28500,
    imagen: "/c1.webp",
    categoria: "camisetas",
    genero: "hombre",
    stats: {
      proteccion: 65,
      conectividad: 92,
      sigilo: 78,
      durabilidad: 70,
    },
  },
  {
    id: "002",
    nombre: "CAMISETA QUANTUM MESH",
    codigo: "QM-C-002-GR",
    precio: 32800,
    imagen: "/c2.webp",
    categoria: "camisetas",
    genero: "hombre",
    stats: {
      proteccion: 60,
      conectividad: 85,
      sigilo: 90,
      durabilidad: 75,
    },
  },
  {
    id: "003",
    nombre: "CAMISETA CYBER GRID",
    codigo: "CG-C-003-BL",
    precio: 30500,
    imagen: "/c3.webp",
    categoria: "camisetas",
    genero: "hombre",
    stats: {
      proteccion: 70,
      conectividad: 88,
      sigilo: 75,
      durabilidad: 80,
    },
  },
  {
    id: "004",
    nombre: "CAMISETA TECH PULSE",
    codigo: "TP-C-004-RD",
    precio: 29900,
    imagen: "/c4.webp",
    categoria: "camisetas",
    genero: "hombre",
    stats: {
      proteccion: 62,
      conectividad: 90,
      sigilo: 82,
      durabilidad: 72,
    },
  },

  // Camisetas - Mujer
  {
    id: "005",
    nombre: "CAMISETA NEURAL LINK",
    codigo: "NL-C-005-PR",
    precio: 29900,
    imagen: "/mc1.webp",
    categoria: "camisetas",
    genero: "mujer",
    stats: {
      proteccion: 55,
      conectividad: 95,
      sigilo: 85,
      durabilidad: 65,
    },
  },
  {
    id: "006",
    nombre: "CAMISETA CYBER PULSE",
    codigo: "CP-C-006-NG",
    precio: 31400,
    imagen: "/mc2.webp",
    categoria: "camisetas",
    genero: "mujer",
    stats: {
      proteccion: 60,
      conectividad: 90,
      sigilo: 80,
      durabilidad: 70,
    },
  },
  {
    id: "007",
    nombre: "CAMISETA NEON FLUX",
    codigo: "NF-C-007-BL",
    precio: 32200,
    imagen: "/mc3.webp",
    categoria: "camisetas",
    genero: "mujer",
    stats: {
      proteccion: 58,
      conectividad: 93,
      sigilo: 82,
      durabilidad: 68,
    },
  },
  {
    id: "008",
    nombre: "CAMISETA DIGITAL WAVE",
    codigo: "DW-C-008-PR",
    precio: 30800,
    imagen: "/mc4.webp",
    categoria: "camisetas",
    genero: "mujer",
    stats: {
      proteccion: 62,
      conectividad: 91,
      sigilo: 83,
      durabilidad: 72,
    },
  },

  // Pantalones - Hombre
  {
    id: "009",
    nombre: "PANTALÓN CARGO QUANTUM",
    codigo: "QC-P-009-NG",
    precio: 42500,
    imagen: "/p1.webp",
    categoria: "pantalones",
    genero: "hombre",
    stats: {
      proteccion: 85,
      conectividad: 70,
      sigilo: 65,
      durabilidad: 90,
    },
  },
  {
    id: "010",
    nombre: "PANTALÓN TÁCTICO STEALTH",
    codigo: "TS-P-010-GR",
    precio: 45800,
    imagen: "/p2.webp",
    categoria: "pantalones",
    genero: "hombre",
    stats: {
      proteccion: 90,
      conectividad: 65,
      sigilo: 95,
      durabilidad: 85,
    },
  },
  {
    id: "011",
    nombre: "PANTALÓN URBAN TECH",
    codigo: "UT-P-011-BL",
    precio: 43500,
    imagen: "/p3.webp",
    categoria: "pantalones",
    genero: "hombre",
    stats: {
      proteccion: 88,
      conectividad: 68,
      sigilo: 90,
      durabilidad: 87,
    },
  },
  {
    id: "012",
    nombre: "PANTALÓN COMBAT FLEX",
    codigo: "CF-P-012-GR",
    precio: 46200,
    imagen: "/p4.webp",
    categoria: "pantalones",
    genero: "hombre",
    stats: {
      proteccion: 92,
      conectividad: 62,
      sigilo: 88,
      durabilidad: 93,
    },
  },

  // Pantalones - Mujer
  {
    id: "013",
    nombre: "PANTALÓN NEURO-FLEX",
    codigo: "NF-P-013-PR",
    precio: 43900,
    imagen: "/mp1.webp",
    categoria: "pantalones",
    genero: "mujer",
    stats: {
      proteccion: 80,
      conectividad: 75,
      sigilo: 90,
      durabilidad: 85,
    },
  },
  {
    id: "014",
    nombre: "PANTALÓN CYBER SLIM",
    codigo: "CS-P-014-NG",
    precio: 41400,
    imagen: "/mp2.webp",
    categoria: "pantalones",
    genero: "mujer",
    stats: {
      proteccion: 75,
      conectividad: 80,
      sigilo: 85,
      durabilidad: 80,
    },
  },
  {
    id: "015",
    nombre: "PANTALÓN TECH LEGGINGS",
    codigo: "TL-P-015-BL",
    precio: 40800,
    imagen: "/mp3.webp",
    categoria: "pantalones",
    genero: "mujer",
    stats: {
      proteccion: 72,
      conectividad: 82,
      sigilo: 88,
      durabilidad: 78,
    },
  },
  {
    id: "016",
    nombre: "PANTALÓN URBAN SHADOW",
    codigo: "US-P-016-GR",
    precio: 42200,
    imagen: "/mp4.webp",
    categoria: "pantalones",
    genero: "mujer",
    stats: {
      proteccion: 78,
      conectividad: 78,
      sigilo: 92,
      durabilidad: 82,
    },
  },

  // Zapatos - Hombre
  {
    id: "017",
    nombre: "BOTAS QUANTUM GRIP",
    codigo: "QG-Z-017-NG",
    precio: 56500,
    imagen: "/z1.webp",
    categoria: "zapatos",
    genero: "hombre",
    stats: {
      proteccion: 95,
      conectividad: 80,
      sigilo: 60,
      durabilidad: 95,
    },
  },
  {
    id: "018",
    nombre: "ZAPATILLAS NEURO-STEP",
    codigo: "NS-Z-018-GR",
    precio: 52800,
    imagen: "/z2.webp",
    categoria: "zapatos",
    genero: "hombre",
    stats: {
      proteccion: 85,
      conectividad: 90,
      sigilo: 75,
      durabilidad: 90,
    },
  },
  {
    id: "019",
    nombre: "BOTAS COMBAT TECH",
    codigo: "CT-Z-019-BL",
    precio: 58200,
    imagen: "/z3.webp",
    categoria: "zapatos",
    genero: "hombre",
    stats: {
      proteccion: 97,
      conectividad: 75,
      sigilo: 65,
      durabilidad: 98,
    },
  },
  {
    id: "020",
    nombre: "ZAPATILLAS URBAN FLUX",
    codigo: "UF-Z-020-RD",
    precio: 54500,
    imagen: "/z4.webp",
    categoria: "zapatos",
    genero: "hombre",
    stats: {
      proteccion: 82,
      conectividad: 92,
      sigilo: 78,
      durabilidad: 88,
    },
  },

  // Zapatos - Mujer
  {
    id: "021",
    nombre: "BOTAS CYBER HELIX",
    codigo: "CH-Z-021-PR",
    precio: 58900,
    imagen: "/mz1.webp",
    categoria: "zapatos",
    genero: "mujer",
    stats: {
      proteccion: 90,
      conectividad: 85,
      sigilo: 70,
      durabilidad: 90,
    },
  },
  {
    id: "022",
    nombre: "ZAPATILLAS QUANTUM PULSE",
    codigo: "QP-Z-022-NG",
    precio: 54400,
    imagen: "/mz2.webp",
    categoria: "zapatos",
    genero: "mujer",
    stats: {
      proteccion: 80,
      conectividad: 95,
      sigilo: 80,
      durabilidad: 85,
    },
  },
  {
    id: "023",
    nombre: "BOTAS NEON STRIDE",
    codigo: "NS-Z-023-BL",
    precio: 57800,
    imagen: "/mz3.webp",
    categoria: "zapatos",
    genero: "mujer",
    stats: {
      proteccion: 88,
      conectividad: 88,
      sigilo: 75,
      durabilidad: 87,
    },
  },
  {
    id: "024",
    nombre: "ZAPATILLAS TECH GLIDE",
    codigo: "TG-Z-024-PR",
    precio: 53600,
    imagen: "/mz4.webp",
    categoria: "zapatos",
    genero: "mujer",
    stats: {
      proteccion: 82,
      conectividad: 93,
      sigilo: 82,
      durabilidad: 83,
    },
  },

  // Accesorios - Hombre
  {
    id: "025",
    nombre: "VISOR NEURAL LINK",
    codigo: "NL-A-025-NG",
    precio: 35500,
    imagen: "/a1.webp",
    categoria: "accesorios",
    genero: "hombre",
    stats: {
      proteccion: 60,
      conectividad: 98,
      sigilo: 70,
      durabilidad: 75,
    },
  },
  {
    id: "026",
    nombre: "GUANTES TÁCTILES QUANTUM",
    codigo: "GT-A-026-GR",
    precio: 28800,
    imagen: "/a2.webp",
    categoria: "accesorios",
    genero: "hombre",
    stats: {
      proteccion: 75,
      conectividad: 95,
      sigilo: 80,
      durabilidad: 85,
    },
  },
  {
    id: "027",
    nombre: "CASCO TECH SHIELD",
    codigo: "TS-A-027-BL",
    precio: 38500,
    imagen: "/a3.webp",
    categoria: "accesorios",
    genero: "hombre",
    stats: {
      proteccion: 95,
      conectividad: 90,
      sigilo: 60,
      durabilidad: 90,
    },
  },
  {
    id: "028",
    nombre: "MOCHILA QUANTUM GRID",
    codigo: "QG-A-028-GR",
    precio: 32500,
    imagen: "/a4.webp",
    categoria: "accesorios",
    genero: "hombre",
    stats: {
      proteccion: 85,
      conectividad: 85,
      sigilo: 75,
      durabilidad: 92,
    },
  },

  // Accesorios - Mujer
  {
    id: "029",
    nombre: "COLLAR NEURO-SYNC",
    codigo: "NS-A-029-PR",
    precio: 32900,
    imagen: "/ma1.webp",
    categoria: "accesorios",
    genero: "mujer",
    stats: {
      proteccion: 50,
      conectividad: 99,
      sigilo: 85,
      durabilidad: 70,
    },
  },
  {
    id: "030",
    nombre: "BRAZALETE QUANTUM LINK",
    codigo: "QL-A-030-NG",
    precio: 29400,
    imagen: "/ma2.webp",
    categoria: "accesorios",
    genero: "mujer",
    stats: {
      proteccion: 55,
      conectividad: 97,
      sigilo: 90,
      durabilidad: 75,
    },
  },
  {
    id: "031",
    nombre: "VISOR NEON PULSE",
    codigo: "NP-A-031-BL",
    precio: 34800,
    imagen: "/ma3.webp",
    categoria: "accesorios",
    genero: "mujer",
    stats: {
      proteccion: 58,
      conectividad: 98,
      sigilo: 88,
      durabilidad: 72,
    },
  },
  {
    id: "032",
    nombre: "BOLSO TECH GRID",
    codigo: "TG-A-032-PR",
    precio: 31200,
    imagen: "/ma4.webp",
    categoria: "accesorios",
    genero: "mujer",
    stats: {
      proteccion: 65,
      conectividad: 92,
      sigilo: 82,
      durabilidad: 78,
    },
  },
]

export default function ProductosPage() {
  const [currentTime, setCurrentTime] = useState("")
  const [glitchActive, setGlitchActive] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null)
  const [generoSeleccionado, setGeneroSeleccionado] = useState<string | null>(null)
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false)
  const [busqueda, setBusqueda] = useState("")
  const [addedToCart, setAddedToCart] = useState<string | null>(null)
  const basePath = getBasePath()

  const { addItem } = useCart()

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

  // Efecto para resetear el estado de "añadido al carrito"
  useEffect(() => {
    if (addedToCart) {
      const timeout = setTimeout(() => {
        setAddedToCart(null)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [addedToCart])

  // Filtrar productos
  const productosFiltrados = productos.filter((producto) => {
    // Filtrar por categoría
    if (categoriaSeleccionada && producto.categoria !== categoriaSeleccionada) {
      return false
    }

    // Filtrar por género
    if (generoSeleccionado && producto.genero !== generoSeleccionado) {
      return false
    }

    // Filtrar por búsqueda
    if (busqueda && !producto.nombre.toLowerCase().includes(busqueda.toLowerCase())) {
      return false
    }

    return true
  })

  // Obtener categorías únicas
  const categorias = Array.from(new Set(productos.map((p) => p.categoria)))

  // Manejar añadir al carrito
  const handleAddToCart = (producto: any) => {
    const { id, nombre, codigo, precio, imagen } = producto
    addItem({ id, nombre, codigo, precio, imagen })
    setAddedToCart(id)
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
              <h1 className="text-4xl font-bold text-white text-center">CATÁLOGO DE PRODUCTOS</h1>
            </GlitchEffect>
            <div className="w-16 h-1 bg-[#965fd4] mt-4"></div>
            <p className="text-[#8bd450] mt-6 max-w-2xl text-center">
              Explora nuestra colección de tecnomoda avanzada diseñada para el entorno urbano moderno. Cada pieza
              combina tecnología de vanguardia con materiales sostenibles.
            </p>
          </div>
        </div>
      </section>

      {/* Barra de filtros */}
      <div className="sticky top-0 z-20 bg-[#1d1a2f] border-b border-[#965fd4]/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Búsqueda */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="BUSCAR PRODUCTOS..."
                className="w-full bg-transparent border border-[#965fd4] px-4 py-2 text-white focus:outline-none focus:border-[#8bd450] pl-10"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#965fd4]" />
            </div>

            {/* Filtros para escritorio */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-[#965fd4]">CATEGORÍA:</span>
                <div className="flex space-x-2">
                  <button
                    className={cn(
                      "text-xs px-3 py-1 border",
                      categoriaSeleccionada === null
                        ? "border-[#8bd450] text-[#8bd450]"
                        : "border-[#965fd4]/50 text-[#965fd4] hover:border-[#965fd4]",
                    )}
                    onClick={() => setCategoriaSeleccionada(null)}
                  >
                    TODOS
                  </button>
                  {categorias.map((cat) => (
                    <button
                      key={cat}
                      className={cn(
                        "text-xs px-3 py-1 border",
                        categoriaSeleccionada === cat
                          ? "border-[#8bd450] text-[#8bd450]"
                          : "border-[#965fd4]/50 text-[#965fd4] hover:border-[#965fd4]",
                      )}
                      onClick={() => setCategoriaSeleccionada(cat)}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-[#965fd4]">GÉNERO:</span>
                <div className="flex space-x-2">
                  <button
                    className={cn(
                      "text-xs px-3 py-1 border",
                      generoSeleccionado === null
                        ? "border-[#8bd450] text-[#8bd450]"
                        : "border-[#965fd4]/50 text-[#965fd4] hover:border-[#965fd4]",
                    )}
                    onClick={() => setGeneroSeleccionado(null)}
                  >
                    TODOS
                  </button>
                  <button
                    className={cn(
                      "text-xs px-3 py-1 border",
                      generoSeleccionado === "hombre"
                        ? "border-[#8bd450] text-[#8bd450]"
                        : "border-[#965fd4]/50 text-[#965fd4] hover:border-[#965fd4]",
                    )}
                    onClick={() => setGeneroSeleccionado("hombre")}
                  >
                    HOMBRE
                  </button>
                  <button
                    className={cn(
                      "text-xs px-3 py-1 border",
                      generoSeleccionado === "mujer"
                        ? "border-[#8bd450] text-[#8bd450]"
                        : "border-[#965fd4]/50 text-[#965fd4] hover:border-[#965fd4]",
                    )}
                    onClick={() => setGeneroSeleccionado("mujer")}
                  >
                    MUJER
                  </button>
                </div>
              </div>
            </div>

            {/* Botón de filtros para móvil */}
            <button
              className="md:hidden flex items-center space-x-2 border border-[#965fd4] px-4 py-2 text-[#965fd4]"
              onClick={() => setFiltrosAbiertos(!filtrosAbiertos)}
            >
              <Filter size={16} />
              <span>FILTROS</span>
            </button>
          </div>

          {/* Panel de filtros móvil */}
          <div
            className={cn(
              "md:hidden transition-all duration-300 overflow-hidden",
              filtrosAbiertos ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0",
            )}
          >
            <div className="border border-[#965fd4]/50 p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[#965fd4]">FILTROS</h3>
                <button onClick={() => setFiltrosAbiertos(false)}>
                  <X size={16} className="text-[#965fd4]" />
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs text-[#965fd4]">CATEGORÍA:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className={cn(
                      "text-xs px-3 py-1 border",
                      categoriaSeleccionada === null
                        ? "border-[#8bd450] text-[#8bd450]"
                        : "border-[#965fd4]/50 text-[#965fd4]",
                    )}
                    onClick={() => setCategoriaSeleccionada(null)}
                  >
                    TODOS
                  </button>
                  {categorias.map((cat) => (
                    <button
                      key={cat}
                      className={cn(
                        "text-xs px-3 py-1 border",
                        categoriaSeleccionada === cat
                          ? "border-[#8bd450] text-[#8bd450]"
                          : "border-[#965fd4]/50 text-[#965fd4]",
                      )}
                      onClick={() => setCategoriaSeleccionada(cat)}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs text-[#965fd4]">GÉNERO:</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    className={cn(
                      "text-xs px-3 py-1 border",
                      generoSeleccionado === null
                        ? "border-[#8bd450] text-[#8bd450]"
                        : "border-[#965fd4]/50 text-[#965fd4]",
                    )}
                    onClick={() => setGeneroSeleccionado(null)}
                  >
                    TODOS
                  </button>
                  <button
                    className={cn(
                      "text-xs px-3 py-1 border",
                      generoSeleccionado === "hombre"
                        ? "border-[#8bd450] text-[#8bd450]"
                        : "border-[#965fd4]/50 text-[#965fd4]",
                    )}
                    onClick={() => setGeneroSeleccionado("hombre")}
                  >
                    HOMBRE
                  </button>
                  <button
                    className={cn(
                      "text-xs px-3 py-1 border",
                      generoSeleccionado === "mujer"
                        ? "border-[#8bd450] text-[#8bd450]"
                        : "border-[#965fd4]/50 text-[#965fd4]",
                    )}
                    onClick={() => setGeneroSeleccionado("mujer")}
                  >
                    MUJER
                  </button>
                </div>
              </div>

              <button
                className="w-full bg-[#965fd4] hover:bg-[#734f9a] text-white px-4 py-2 mt-4"
                onClick={() => setFiltrosAbiertos(false)}
              >
                APLICAR FILTROS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Listado de productos */}
      <section className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          {productosFiltrados.length > 0 ? (
            <>
              <div className="text-xs text-[#965fd4] mb-4">MOSTRANDO {productosFiltrados.length} PRODUCTOS</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productosFiltrados.map((producto) => (
                  <div
                    key={producto.id}
                    className="border border-[#965fd4]/50 bg-[#1d1a2f]/80 relative overflow-hidden group"
                    onMouseEnter={() => setHoveredProduct(producto.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="absolute top-0 left-0 w-full h-8 bg-[#1d1a2f] flex items-center px-2 z-10">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-[#965fd4]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#8bd450]"></div>
                      </div>
                      <span className="text-xs text-[#965fd4] ml-2 truncate">{producto.codigo}</span>
                    </div>

                    <div className="pt-8 p-4 relative">
                      <div className="relative aspect-square w-full overflow-hidden mb-4">
                        <PixelatedImage
                          src={`${basePath}${producto.imagen}`}
                          alt={producto.nombre}
                          pixelSize={2}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Overlay del producto */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1d1a2f] to-transparent opacity-60"></div>

                        {/* Overlay de estadísticas - visible al pasar el ratón */}
                        <div
                          className={cn(
                            "absolute inset-0 bg-[#1d1a2f]/80 flex flex-col justify-center items-center p-4 transition-opacity duration-300",
                            hoveredProduct === producto.id ? "opacity-100" : "opacity-0",
                          )}
                        >
                          <h4 className="text-[#965fd4] text-sm mb-4">MÉTRICAS DE RENDIMIENTO</h4>
                          <div className="w-full space-y-3">
                            {Object.entries(producto.stats).map(([key, value]) => (
                              <div key={key} className="flex items-center">
                                <div className="w-24 text-xs text-[#8bd450] capitalize">{key}</div>
                                <ProgressBar value={value} className="flex-1" />
                                <div className="ml-2 text-xs text-[#8bd450]">{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-[#8bd450] mb-2">{producto.nombre}</h3>

                      <div className="flex justify-between items-center">
                        <div className="text-[#965fd4] font-bold">{producto.precio.toLocaleString()} RSD</div>
                        <button
                          className={cn(
                            "bg-[#965fd4] hover:bg-[#734f9a] text-white p-2 flex items-center justify-center transition-colors",
                            addedToCart === producto.id && "bg-[#8bd450]",
                          )}
                          onClick={() => handleAddToCart(producto)}
                        >
                          {addedToCart === producto.id ? (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M20 6L9 17L4 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <ShoppingBag size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Decoraciones de esquina */}
                    <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#965fd4]/50 -mt-px -mr-px"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[#965fd4]/50 -mb-px -ml-px"></div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 border border-[#965fd4]/30">
              <GlitchEffect active={glitchActive}>
                <h3 className="text-2xl font-bold text-[#965fd4] mb-4">NO SE ENCONTRARON PRODUCTOS</h3>
              </GlitchEffect>
              <p className="text-[#8bd450] mb-6">No hay productos que coincidan con los criterios de búsqueda.</p>
              <button
                className="bg-[#965fd4] hover:bg-[#734f9a] text-white px-6 py-3 flex items-center justify-center transition-colors"
                onClick={() => {
                  setCategoriaSeleccionada(null)
                  setGeneroSeleccionado(null)
                  setBusqueda("")
                }}
              >
                RESTABLECER FILTROS
                <X size={16} className="ml-2" />
              </button>
            </div>
          )}
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
                { name: "PRODUCTOS", href: `${basePath}/productos` },
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
              <Link href="#" className="text-xs text-[#8bd450]/50 hover:text-[#965fd4] transition-colors">
                POLÍTICA DE PRIVACIDAD
              </Link>
              <Link href="#" className="text-xs text-[#8bd450]/50 hover:text-[#965fd4] transition-colors">
                TÉRMINOS DE SERVICIO
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

