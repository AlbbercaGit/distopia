"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import { GlitchEffect } from "@/components/glitch-effect"
import { PixelatedImage } from "@/components/pixelated-image"
import Link from "next/link"

export function Cart() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart()

  const [glitchActive, setGlitchActive] = useState(false)
  const [checkoutStatus, setCheckoutStatus] = useState<"IDLE" | "PROCESSING" | "COMPLETED">("IDLE")

  // Efecto de glitch aleatorio
  useEffect(() => {
    if (isOpen) {
      const glitchInterval = setInterval(() => {
        const shouldGlitch = Math.random() > 0.8
        if (shouldGlitch) {
          setGlitchActive(true)
          setTimeout(() => setGlitchActive(false), 200)
        }
      }, 2000)

      return () => clearInterval(glitchInterval)
    }
  }, [isOpen])

  const handleCheckout = () => {
    if (items.length === 0) return

    setCheckoutStatus("PROCESSING")

    // Simular procesamiento de pago
    setTimeout(() => {
      setCheckoutStatus("COMPLETED")

      // Reiniciar después de mostrar confirmación
      setTimeout(() => {
        clearCart()
        setCheckoutStatus("IDLE")
        setIsOpen(false)
      }, 2000)
    }, 1500)
  }

  return (
    <>
      {/* Botón del carrito */}
      <button
        className="relative text-white p-2 hover:text-[#8bd450] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCart size={20} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#965fd4] rounded-full text-xs flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />}

      {/* Panel del carrito */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-96 bg-[#1d1a2f] border-l border-[#965fd4] z-50 transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Encabezado */}
          <div className="bg-[#965fd4] p-4 flex justify-between items-center">
            <GlitchEffect active={glitchActive}>
              <h2 className="text-xl font-bold text-white flex items-center">
                <ShoppingCart size={20} className="mr-2" />
                CARRITO DE COMPRA
              </h2>
            </GlitchEffect>
            <button className="text-white hover:text-[#8bd450]" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Contenido */}
          <div className="flex-1 overflow-auto p-4">
            {items.length > 0 ? (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="border border-[#965fd4]/50 p-3 relative">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#965fd4]/50 -mt-px -mr-px"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#965fd4]/50 -mb-px -ml-px"></div>

                    <div className="flex gap-3">
                      <div className="w-16 h-16 border border-[#965fd4] overflow-hidden">
                        <PixelatedImage
                          src={item.imagen}
                          alt={item.nombre}
                          pixelSize={2}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-[#8bd450] mb-1">{item.nombre}</h3>
                        <div className="text-xs text-[#965fd4] mb-2">{item.codigo}</div>

                        <div className="flex justify-between items-center">
                          <div className="text-sm text-[#965fd4] font-bold">{item.precio.toLocaleString()} RSD</div>

                          <div className="flex items-center space-x-2">
                            <button
                              className="w-6 h-6 border border-[#965fd4] flex items-center justify-center text-[#965fd4] hover:bg-[#965fd4] hover:text-white transition-colors"
                              onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                              disabled={item.cantidad <= 1}
                            >
                              <Minus size={14} />
                            </button>

                            <span className="text-[#8bd450] w-6 text-center">{item.cantidad}</span>

                            <button
                              className="w-6 h-6 border border-[#965fd4] flex items-center justify-center text-[#965fd4] hover:bg-[#965fd4] hover:text-white transition-colors"
                              onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                            >
                              <Plus size={14} />
                            </button>

                            <button
                              className="w-6 h-6 border border-[#965fd4] flex items-center justify-center text-[#965fd4] hover:bg-[#965fd4] hover:text-white transition-colors ml-2"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 border-2 border-[#965fd4] rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart size={24} className="text-[#965fd4]" />
                </div>
                <h3 className="text-[#965fd4] font-bold mb-2">CARRITO VACÍO</h3>
                <p className="text-[#8bd450] text-sm text-center">No hay productos en tu carrito de compra.</p>
              </div>
            )}
          </div>

          {/* Resumen y botones */}
          <div className="border-t border-[#965fd4]/30 p-4">
            {items.length > 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8bd450]">Subtotal:</span>
                    <span className="text-[#8bd450]">{totalPrice.toLocaleString()} RSD</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#8bd450]">Impuestos (21%):</span>
                    <span className="text-[#8bd450]">{Math.round(totalPrice * 0.21).toLocaleString()} RSD</span>
                  </div>

                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#965fd4]/30">
                    <span className="text-[#965fd4]">TOTAL:</span>
                    <span className="text-[#965fd4]">{Math.round(totalPrice * 1.21).toLocaleString()} RSD</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    className="border border-[#965fd4] text-[#965fd4] hover:bg-[#965fd4]/10 px-4 py-2 flex items-center justify-center transition-colors"
                    onClick={() => clearCart()}
                  >
                    VACIAR
                    <Trash2 size={16} className="ml-2" />
                  </button>

                  <Link
                    href="/checkout"
                    className="bg-[#965fd4] hover:bg-[#734f9a] text-white px-4 py-2 flex items-center justify-center transition-colors"
                  >
                    FINALIZAR COMPRA
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            )}

            <button
              className="w-full mt-4 border border-[#8bd450] text-[#8bd450] hover:bg-[#3f6d4e]/20 px-4 py-2 flex items-center justify-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              CONTINUAR COMPRANDO
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

