"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  CreditCard,
  Truck,
  User,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Shield,
  AlertTriangle,
  Check,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { GlitchEffect } from "@/components/glitch-effect"
import { ScanLine } from "@/components/scan-line"
import { NavBar } from "@/components/nav-bar"
import { useCart } from "@/contexts/cart-context"
import { PixelatedImage } from "@/components/pixelated-image"

// Tipos para el formulario
interface CheckoutForm {
  nombre: string
  apellido: string
  email: string
  telefono: string
  direccion: string
  ciudad: string
  codigoPostal: string
  pais: string
  metodoPago: "tarjeta" | "transferencia" | "cripto"
  numeroTarjeta?: string
  fechaExpiracion?: string
  cvv?: string
  titularTarjeta?: string
}

export default function CheckoutPage() {
  const [currentTime, setCurrentTime] = useState("")
  const [glitchActive, setGlitchActive] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [paso, setPaso] = useState<1 | 2 | 3>(1)
  const [procesando, setProcesando] = useState(false)
  const [pedidoCompletado, setPedidoCompletado] = useState(false)
  const [numeroPedido, setNumeroPedido] = useState("")

  const [form, setForm] = useState<CheckoutForm>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    pais: "España",
    metodoPago: "tarjeta",
    numeroTarjeta: "",
    fechaExpiracion: "",
    cvv: "",
    titularTarjeta: "",
  })

  const { items, totalItems, totalPrice, clearCart } = useCart()
  const router = useRouter()

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (items.length === 0 && !pedidoCompletado) {
      router.push("/productos")
    }
  }, [items.length, router, pedidoCompletado])

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

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (paso === 1) {
      setPaso(2)
      window.scrollTo(0, 0)
    } else if (paso === 2) {
      setPaso(3)
      window.scrollTo(0, 0)
    } else if (paso === 3) {
      finalizarCompra()
    }
  }

  // Simular finalización de compra
  const finalizarCompra = () => {
    setProcesando(true)

    // Simular procesamiento
    setTimeout(() => {
      // Generar número de pedido aleatorio
      const randomOrderNumber = `ORD-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}-${new Date().getFullYear()}`
      setNumeroPedido(randomOrderNumber)

      setProcesando(false)
      setPedidoCompletado(true)
      clearCart()
    }, 3000)
  }

  // Calcular totales
  const subtotal = totalPrice
  const impuestos = Math.round(subtotal * 0.21)
  const envio = subtotal > 50000 ? 0 : 4500
  const total = subtotal + impuestos + envio

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
              <h1 className="text-4xl font-bold text-white text-center">
                {pedidoCompletado ? "PEDIDO COMPLETADO" : "FINALIZAR COMPRA"}
              </h1>
            </GlitchEffect>
            <div className="w-16 h-1 bg-[#965fd4] mt-4"></div>

            {!pedidoCompletado && (
              <div className="flex items-center justify-center mt-8 w-full max-w-2xl">
                <div className="flex-1 relative">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2",
                      paso >= 1 ? "bg-[#965fd4] border-[#965fd4]" : "bg-transparent border-[#965fd4]/50",
                    )}
                  >
                    <span className="text-white">1</span>
                  </div>
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-xs text-[#965fd4]">
                    ENVÍO
                  </div>
                </div>

                <div className="w-16 h-0.5 bg-[#965fd4]/50">
                  <div
                    className={cn("h-full bg-[#965fd4] transition-all duration-500", paso >= 2 ? "w-full" : "w-0")}
                  ></div>
                </div>

                <div className="flex-1 relative">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2",
                      paso >= 2 ? "bg-[#965fd4] border-[#965fd4]" : "bg-transparent border-[#965fd4]/50",
                    )}
                  >
                    <span className={paso >= 2 ? "text-white" : "text-[#965fd4]/50"}>2</span>
                  </div>
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-xs text-[#965fd4]">
                    PAGO
                  </div>
                </div>

                <div className="w-16 h-0.5 bg-[#965fd4]/50">
                  <div
                    className={cn("h-full bg-[#965fd4] transition-all duration-500", paso >= 3 ? "w-full" : "w-0")}
                  ></div>
                </div>

                <div className="flex-1 relative">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2",
                      paso >= 3 ? "bg-[#965fd4] border-[#965fd4]" : "bg-transparent border-[#965fd4]/50",
                    )}
                  >
                    <span className={paso >= 3 ? "text-white" : "text-[#965fd4]/50"}>3</span>
                  </div>
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-xs text-[#965fd4]">
                    CONFIRMAR
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          {pedidoCompletado ? (
            <div className="max-w-2xl mx-auto">
              <div className="border border-[#965fd4] p-8 relative">
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#965fd4] -mt-px -mr-px"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#965fd4] -mb-px -ml-px"></div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-[#965fd4]/20 border-2 border-[#965fd4] flex items-center justify-center mb-6">
                    <Check size={40} className="text-[#8bd450]" />
                  </div>

                  <GlitchEffect active={glitchActive}>
                    <h2 className="text-2xl font-bold text-white mb-4">PEDIDO PROCESADO CORRECTAMENTE</h2>
                  </GlitchEffect>

                  <p className="text-[#8bd450] mb-6">
                    Tu pedido ha sido procesado y está siendo preparado para su envío. Recibirás un correo electrónico
                    con los detalles de seguimiento.
                  </p>

                  <div className="w-full p-4 border border-[#965fd4]/50 bg-[#965fd4]/10 mb-8">
                    <div className="text-xs text-[#965fd4] mb-2">NÚMERO DE PEDIDO</div>
                    <div className="text-xl font-mono text-[#8bd450]">{numeroPedido}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
                    <div className="border border-[#965fd4]/30 p-4">
                      <div className="text-xs text-[#965fd4] mb-2">FECHA DEL PEDIDO</div>
                      <div className="text-[#8bd450]">{new Date().toLocaleDateString()}</div>
                    </div>

                    <div className="border border-[#965fd4]/30 p-4">
                      <div className="text-xs text-[#965fd4] mb-2">MÉTODO DE PAGO</div>
                      <div className="text-[#8bd450]">
                        {form.metodoPago === "tarjeta" && "Tarjeta de crédito"}
                        {form.metodoPago === "transferencia" && "Transferencia bancaria"}
                        {form.metodoPago === "cripto" && "Criptomoneda"}
                      </div>
                    </div>

                    <div className="border border-[#965fd4]/30 p-4">
                      <div className="text-xs text-[#965fd4] mb-2">DIRECCIÓN DE ENVÍO</div>
                      <div className="text-[#8bd450]">
                        {form.nombre} {form.apellido}
                        <br />
                        {form.direccion}
                        <br />
                        {form.codigoPostal}, {form.ciudad}
                        <br />
                        {form.pais}
                      </div>
                    </div>

                    <div className="border border-[#965fd4]/30 p-4">
                      <div className="text-xs text-[#965fd4] mb-2">TOTAL</div>
                      <div className="text-xl font-bold text-[#8bd450]">{total.toLocaleString()} RSD</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/"
                      className="px-6 py-3 border border-[#965fd4] text-[#965fd4] hover:bg-[#965fd4]/10 transition-colors flex items-center justify-center"
                    >
                      VOLVER AL INICIO
                    </Link>

                    <Link
                      href="/productos"
                      className="px-6 py-3 bg-[#965fd4] hover:bg-[#734f9a] text-white transition-colors flex items-center justify-center"
                    >
                      SEGUIR COMPRANDO
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulario */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  {/* Paso 1: Información de envío */}
                  {paso === 1 && (
                    <div className="border border-[#965fd4] p-6 relative">
                      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#965fd4] -mt-px -mr-px"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#965fd4] -mb-px -ml-px"></div>

                      <h2 className="text-xl font-bold text-[#965fd4] mb-6 flex items-center">
                        <Truck size={20} className="mr-2" />
                        INFORMACIÓN DE ENVÍO
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs text-[#965fd4]">NOMBRE</label>
                          <div className="relative">
                            <input
                              type="text"
                              name="nombre"
                              value={form.nombre}
                              onChange={handleChange}
                              className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450] pl-10"
                              placeholder="TU NOMBRE"
                              required
                            />
                            <User
                              size={16}
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#965fd4]"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs text-[#965fd4]">APELLIDO</label>
                          <div className="relative">
                            <input
                              type="text"
                              name="apellido"
                              value={form.apellido}
                              onChange={handleChange}
                              className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450] pl-10"
                              placeholder="TU APELLIDO"
                              required
                            />
                            <User
                              size={16}
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#965fd4]"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs text-[#965fd4]">EMAIL</label>
                          <div className="relative">
                            <input
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450] pl-10"
                              placeholder="TU EMAIL"
                              required
                            />
                            <Mail
                              size={16}
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#965fd4]"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs text-[#965fd4]">TELÉFONO</label>
                          <div className="relative">
                            <input
                              type="tel"
                              name="telefono"
                              value={form.telefono}
                              onChange={handleChange}
                              className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450] pl-10"
                              placeholder="TU TELÉFONO"
                              required
                            />
                            <Phone
                              size={16}
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#965fd4]"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs text-[#965fd4]">DIRECCIÓN</label>
                          <div className="relative">
                            <input
                              type="text"
                              name="direccion"
                              value={form.direccion}
                              onChange={handleChange}
                              className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450] pl-10"
                              placeholder="TU DIRECCIÓN"
                              required
                            />
                            <MapPin
                              size={16}
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#965fd4]"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs text-[#965fd4]">CIUDAD</label>
                          <input
                            type="text"
                            name="ciudad"
                            value={form.ciudad}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450]"
                            placeholder="TU CIUDAD"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs text-[#965fd4]">CÓDIGO POSTAL</label>
                          <input
                            type="text"
                            name="codigoPostal"
                            value={form.codigoPostal}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450]"
                            placeholder="TU CÓDIGO POSTAL"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs text-[#965fd4]">PAÍS</label>
                          <select
                            name="pais"
                            value={form.pais}
                            onChange={handleChange}
                            className="w-full bg-[#1d1a2f] border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450]"
                            required
                          >
                            <option value="España">España</option>
                            <option value="México">México</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Chile">Chile</option>
                            <option value="Perú">Perú</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-8 flex justify-between">
                        <Link
                          href="/productos"
                          className="px-6 py-3 border border-[#965fd4] text-[#965fd4] hover:bg-[#965fd4]/10 transition-colors flex items-center"
                        >
                          <ArrowLeft size={16} className="mr-2" />
                          VOLVER
                        </Link>

                        <button
                          type="submit"
                          className="px-6 py-3 bg-[#965fd4] hover:bg-[#734f9a] text-white transition-colors flex items-center"
                        >
                          CONTINUAR
                          <ChevronRight size={16} className="ml-2" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Paso 2: Método de pago */}
                  {paso === 2 && (
                    <div className="border border-[#965fd4] p-6 relative">
                      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#965fd4] -mt-px -mr-px"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#965fd4] -mb-px -ml-px"></div>

                      <h2 className="text-xl font-bold text-[#965fd4] mb-6 flex items-center">
                        <CreditCard size={20} className="mr-2" />
                        MÉTODO DE PAGO
                      </h2>

                      <div className="space-y-6">
                        <div className="space-y-4">
                          <label className="text-xs text-[#965fd4]">SELECCIONA UN MÉTODO DE PAGO</label>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label
                              className={cn(
                                "border p-4 cursor-pointer flex items-center",
                                form.metodoPago === "tarjeta"
                                  ? "border-[#8bd450] bg-[#8bd450]/5"
                                  : "border-[#965fd4]/50",
                              )}
                            >
                              <input
                                type="radio"
                                name="metodoPago"
                                value="tarjeta"
                                checked={form.metodoPago === "tarjeta"}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              <div className="w-5 h-5 rounded-full border mr-3 flex items-center justify-center">
                                {form.metodoPago === "tarjeta" && (
                                  <div className="w-3 h-3 rounded-full bg-[#8bd450]"></div>
                                )}
                              </div>
                              <span className="text-[#8bd450]">TARJETA DE CRÉDITO</span>
                            </label>

                            <label
                              className={cn(
                                "border p-4 cursor-pointer flex items-center",
                                form.metodoPago === "transferencia"
                                  ? "border-[#8bd450] bg-[#8bd450]/5"
                                  : "border-[#965fd4]/50",
                              )}
                            >
                              <input
                                type="radio"
                                name="metodoPago"
                                value="transferencia"
                                checked={form.metodoPago === "transferencia"}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              <div className="w-5 h-5 rounded-full border mr-3 flex items-center justify-center">
                                {form.metodoPago === "transferencia" && (
                                  <div className="w-3 h-3 rounded-full bg-[#8bd450]"></div>
                                )}
                              </div>
                              <span className="text-[#8bd450]">TRANSFERENCIA</span>
                            </label>

                            <label
                              className={cn(
                                "border p-4 cursor-pointer flex items-center",
                                form.metodoPago === "cripto"
                                  ? "border-[#8bd450] bg-[#8bd450]/5"
                                  : "border-[#965fd4]/50",
                              )}
                            >
                              <input
                                type="radio"
                                name="metodoPago"
                                value="cripto"
                                checked={form.metodoPago === "cripto"}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              <div className="w-5 h-5 rounded-full border mr-3 flex items-center justify-center">
                                {form.metodoPago === "cripto" && (
                                  <div className="w-3 h-3 rounded-full bg-[#8bd450]"></div>
                                )}
                              </div>
                              <span className="text-[#8bd450]">CRIPTOMONEDA</span>
                            </label>
                          </div>
                        </div>

                        {/* Campos para tarjeta de crédito */}
                        {form.metodoPago === "tarjeta" && (
                          <div className="space-y-6 border border-[#965fd4]/30 p-4">
                            <div className="space-y-2">
                              <label className="text-xs text-[#965fd4]">NÚMERO DE TARJETA</label>
                              <div className="relative">
                                <input
                                  type="text"
                                  name="numeroTarjeta"
                                  value={form.numeroTarjeta}
                                  onChange={handleChange}
                                  className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450] pl-10"
                                  placeholder="XXXX XXXX XXXX XXXX"
                                  required
                                />
                                <CreditCard
                                  size={16}
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#965fd4]"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-xs text-[#965fd4]">FECHA DE EXPIRACIÓN</label>
                                <input
                                  type="text"
                                  name="fechaExpiracion"
                                  value={form.fechaExpiracion}
                                  onChange={handleChange}
                                  className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450]"
                                  placeholder="MM/AA"
                                  required
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-xs text-[#965fd4]">CVV</label>
                                <input
                                  type="text"
                                  name="cvv"
                                  value={form.cvv}
                                  onChange={handleChange}
                                  className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450]"
                                  placeholder="XXX"
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs text-[#965fd4]">TITULAR DE LA TARJETA</label>
                              <input
                                type="text"
                                name="titularTarjeta"
                                value={form.titularTarjeta}
                                name="titularTarjeta"
                                value={form.titularTarjeta}
                                onChange={handleChange}
                                className="w-full bg-transparent border border-[#965fd4] px-4 py-3 text-white focus:outline-none focus:border-[#8bd450]"
                                placeholder="NOMBRE EN LA TARJETA"
                                required
                              />
                            </div>
                          </div>
                        )}

                        {/* Información para transferencia bancaria */}
                        {form.metodoPago === "transferencia" && (
                          <div className="border border-[#965fd4]/30 p-4">
                            <div className="text-xs text-[#965fd4] mb-2">INFORMACIÓN BANCARIA</div>
                            <p className="text-[#8bd450] mb-4">
                              Realiza una transferencia a la siguiente cuenta bancaria. Tu pedido será procesado una vez
                              se confirme el pago.
                            </p>

                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between">
                                <span className="text-xs text-[#965fd4]">BANCO:</span>
                                <span className="text-[#8bd450]">BANCO DISTOPÍA</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-xs text-[#965fd4]">TITULAR:</span>
                                <span className="text-[#8bd450]">INDUSTRIAS DISTOPÍA S.L.</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-xs text-[#965fd4]">IBAN:</span>
                                <span className="text-[#8bd450]">ES91 2100 0418 4502 0005 1332</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-xs text-[#965fd4]">BIC/SWIFT:</span>
                                <span className="text-[#8bd450]">DYSTOPIAXXXX</span>
                              </div>
                            </div>

                            <div className="flex items-start p-3 bg-[#965fd4]/10 border border-[#965fd4]/30">
                              <AlertTriangle size={20} className="text-[#965fd4] mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-[#8bd450]">
                                Importante: Incluye tu nombre completo y dirección de email en el concepto de la
                                transferencia para que podamos identificar tu pago.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Información para criptomonedas */}
                        {form.metodoPago === "cripto" && (
                          <div className="border border-[#965fd4]/30 p-4">
                            <div className="text-xs text-[#965fd4] mb-2">PAGO CON CRIPTOMONEDAS</div>
                            <p className="text-[#8bd450] mb-4">
                              Realiza un pago a las siguientes direcciones. Tu pedido será procesado una vez se confirme
                              la transacción.
                            </p>

                            <div className="space-y-4 mb-4">
                              <div className="space-y-2">
                                <div className="text-xs text-[#965fd4]">BITCOIN (BTC):</div>
                                <div className="p-2 bg-[#1d1a2f] border border-[#965fd4]/30 text-[#8bd450] break-all text-xs">
                                  3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="text-xs text-[#965fd4]">ETHEREUM (ETH):</div>
                                <div className="p-2 bg-[#1d1a2f] border border-[#965fd4]/30 text-[#8bd450] break-all text-xs">
                                  0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start p-3 bg-[#965fd4]/10 border border-[#965fd4]/30">
                              <AlertTriangle size={20} className="text-[#965fd4] mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-[#8bd450]">
                                Importante: Después de realizar el pago, envía un email a crypto@distopia-tech.net con
                                el hash de la transacción y tu número de pedido.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setPaso(1)}
                          className="px-6 py-3 border border-[#965fd4] text-[#965fd4] hover:bg-[#965fd4]/10 transition-colors flex items-center"
                        >
                          <ArrowLeft size={16} className="mr-2" />
                          VOLVER
                        </button>

                        <button
                          type="submit"
                          className="px-6 py-3 bg-[#965fd4] hover:bg-[#734f9a] text-white transition-colors flex items-center"
                        >
                          CONTINUAR
                          <ChevronRight size={16} className="ml-2" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Paso 3: Confirmación */}
                  {paso === 3 && (
                    <div className="border border-[#965fd4] p-6 relative">
                      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#965fd4] -mt-px -mr-px"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#965fd4] -mb-px -ml-px"></div>

                      <h2 className="text-xl font-bold text-[#965fd4] mb-6 flex items-center">
                        <Shield size={20} className="mr-2" />
                        CONFIRMAR PEDIDO
                      </h2>

                      <div className="space-y-6">
                        <div className="border border-[#965fd4]/30 p-4">
                          <h3 className="text-[#965fd4] text-lg mb-4">RESUMEN DEL PEDIDO</h3>

                          <div className="space-y-4 mb-6">
                            {items.map((item) => (
                              <div key={item.id} className="flex gap-3 border-b border-[#965fd4]/20 pb-3">
                                <div className="w-16 h-16 border border-[#965fd4] overflow-hidden">
                                  <PixelatedImage
                                    src={item.imagen}
                                    alt={item.nombre}
                                    pixelSize={2}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div className="flex-1">
                                  <h4 className="text-sm font-bold text-[#8bd450]">{item.nombre}</h4>
                                  <div className="text-xs text-[#965fd4] mb-1">{item.codigo}</div>
                                  <div className="flex justify-between">
                                    <div className="text-xs text-[#8bd450]">Cantidad: {item.cantidad}</div>
                                    <div className="text-sm text-[#965fd4]">
                                      {(item.precio * item.cantidad).toLocaleString()} RSD
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-2 pt-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-[#8bd450]">Subtotal:</span>
                              <span className="text-[#8bd450]">{subtotal.toLocaleString()} RSD</span>
                            </div>

                            <div className="flex justify-between text-sm">
                              <span className="text-[#8bd450]">Impuestos (21%):</span>
                              <span className="text-[#8bd450]">{impuestos.toLocaleString()} RSD</span>
                            </div>

                            <div className="flex justify-between text-sm">
                              <span className="text-[#8bd450]">Envío:</span>
                              <span className="text-[#8bd450]">
                                {envio === 0 ? "GRATIS" : `${envio.toLocaleString()} RSD`}
                              </span>
                            </div>

                            <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#965fd4]/30">
                              <span className="text-[#965fd4]">TOTAL:</span>
                              <span className="text-[#965fd4]">{total.toLocaleString()} RSD</span>
                            </div>
                          </div>
                        </div>

                        <div className="border border-[#965fd4]/30 p-4">
                          <h3 className="text-[#965fd4] text-lg mb-4">DATOS DE ENVÍO</h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-xs text-[#965fd4] mb-1">NOMBRE COMPLETO</div>
                              <div className="text-[#8bd450]">
                                {form.nombre} {form.apellido}
                              </div>
                            </div>

                            <div>
                              <div className="text-xs text-[#965fd4] mb-1">EMAIL</div>
                              <div className="text-[#8bd450]">{form.email}</div>
                            </div>

                            <div>
                              <div className="text-xs text-[#965fd4] mb-1">TELÉFONO</div>
                              <div className="text-[#8bd450]">{form.telefono}</div>
                            </div>

                            <div>
                              <div className="text-xs text-[#965fd4] mb-1">DIRECCIÓN</div>
                              <div className="text-[#8bd450]">
                                {form.direccion}
                                <br />
                                {form.codigoPostal}, {form.ciudad}
                                <br />
                                {form.pais}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border border-[#965fd4]/30 p-4">
                          <h3 className="text-[#965fd4] text-lg mb-4">MÉTODO DE PAGO</h3>

                          <div className="text-[#8bd450]">
                            {form.metodoPago === "tarjeta" && (
                              <div className="flex items-center">
                                <CreditCard size={16} className="mr-2" />
                                <span>Tarjeta de crédito terminada en {form.numeroTarjeta?.slice(-4) || "****"}</span>
                              </div>
                            )}

                            {form.metodoPago === "transferencia" && (
                              <div className="flex items-center">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2"
                                >
                                  <path d="M16 6l3 -3l3 3" />
                                  <path d="M19 3v7" />
                                  <path d="M8 18l-3 3l-3 -3" />
                                  <path d="M5 21v-7" />
                                  <path d="M22 12h-5a3 3 0 0 0 -3 3v4a3 3 0 0 0 3 3h5" />
                                  <path d="M2 12h5a3 3 0 0 1 3 3v4a3 3 0 0 1 -3 3h-5" />
                                </svg>
                                <span>Transferencia bancaria</span>
                              </div>
                            )}

                            {form.metodoPago === "cripto" && (
                              <div className="flex items-center">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2"
                                >
                                  <path d="M11.767 19.089c4.924 .868 9.232 -2.13 9.232 -5.989c0 -3.792 -4.166 -6.857 -9.232 -6.857c-5.066 0 -9.233 3.065 -9.233 6.857c0 3.858 4.307 6.856 9.233 5.989z" />
                                  <path d="M11.767 19.089c-4.924 .868 -9.233 -2.13 -9.233 -5.989c0 -3.792 4.166 -6.857 9.233 -6.857c5.066 0 9.232 3.065 9.232 6.857c0 3.858 -4.307 6.856 -9.232 5.989z" />
                                  <path d="M12 7v-4" />
                                  <path d="M12 21v-4" />
                                </svg>
                                <span>Criptomoneda</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="terminos"
                            className="w-4 h-4 border border-[#965fd4] bg-transparent focus:ring-[#8bd450]"
                            required
                          />
                          <label htmlFor="terminos" className="text-xs text-[#8bd450]">
                            Acepto los{" "}
                            <Link href="#" className="text-[#965fd4] hover:underline">
                              términos y condiciones
                            </Link>{" "}
                            y la{" "}
                            <Link href="#" className="text-[#965fd4] hover:underline">
                              política de privacidad
                            </Link>
                          </label>
                        </div>
                      </div>

                      <div className="mt-8 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setPaso(2)}
                          className="px-6 py-3 border border-[#965fd4] text-[#965fd4] hover:bg-[#965fd4]/10 transition-colors flex items-center"
                        >
                          <ArrowLeft size={16} className="mr-2" />
                          VOLVER
                        </button>

                        <button
                          type="submit"
                          className={cn(
                            "px-6 py-3 bg-[#965fd4] hover:bg-[#734f9a] text-white transition-colors flex items-center",
                            procesando && "opacity-70 cursor-not-allowed",
                          )}
                          disabled={procesando}
                        >
                          {procesando ? (
                            <div className="flex items-center">
                              <div className="animate-pulse mr-2">PROCESANDO</div>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          ) : (
                            <>
                              FINALIZAR COMPRA
                              <ChevronRight size={16} className="ml-2" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Resumen del pedido */}
              <div className="lg:col-span-1">
                <div className="border border-[#965fd4] p-6 relative sticky top-24">
                  <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#965fd4] -mt-px -mr-px"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#965fd4] -mb-px -ml-px"></div>

                  <h2 className="text-xl font-bold text-[#965fd4] mb-6">RESUMEN DEL PEDIDO</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-[#8bd450]">Productos:</span>
                      <span className="text-[#8bd450]">{totalItems}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#8bd450]">Subtotal:</span>
                      <span className="text-[#8bd450]">{subtotal.toLocaleString()} RSD</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#8bd450]">Impuestos (21%):</span>
                      <span className="text-[#8bd450]">{impuestos.toLocaleString()} RSD</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#8bd450]">Envío:</span>
                      <span className="text-[#8bd450]">{envio === 0 ? "GRATIS" : `${envio.toLocaleString()} RSD`}</span>
                    </div>

                    <div className="pt-4 border-t border-[#965fd4]/30">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-[#965fd4]">TOTAL:</span>
                        <span className="text-[#965fd4]">{total.toLocaleString()} RSD</span>
                      </div>

                      {envio === 0 && (
                        <div className="mt-2 text-xs text-[#8bd450]">
                          Envío gratuito en pedidos superiores a 50.000 RSD
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-[#8bd450] text-sm">
                      <Truck size={16} className="mr-2" />
                      <span>Envío en 2-4 días laborables</span>
                    </div>

                    <div className="flex items-center text-[#8bd450] text-sm">
                      <Shield size={16} className="mr-2" />
                      <span>Pago seguro garantizado</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#965fd4]/30">
                    <div className="text-xs text-[#965fd4] mb-2">TIENES ALGUNA PREGUNTA?</div>
                    <Link href="/contacto" className="text-[#8bd450] text-sm hover:text-[#965fd4] transition-colors">
                      Contacta con nuestro equipo de soporte
                    </Link>
                  </div>
                </div>
              </div>
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

