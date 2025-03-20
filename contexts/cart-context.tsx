"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Tipo para los productos en el carrito
export interface CartItem {
  id: string
  nombre: string
  codigo: string
  precio: number
  imagen: string
  cantidad: number
}

// Interfaz del contexto del carrito
interface CartContextType {
  items: CartItem[]
  addItem: (product: Omit<CartItem, "cantidad">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, cantidad: number) => void
  clearCart: () => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  totalItems: number
  totalPrice: number
}

// Crear el contexto
const CartContext = createContext<CartContextType | undefined>(undefined)

// Proveedor del contexto
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error al cargar el carrito:", error)
      }
    }
  }, [])

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items))
    }

    // Calcular totales
    const itemCount = items.reduce((total, item) => total + item.cantidad, 0)
    const priceSum = items.reduce((total, item) => total + item.precio * item.cantidad, 0)

    setTotalItems(itemCount)
    setTotalPrice(priceSum)
  }, [items])

  // Añadir producto al carrito
  const addItem = (product: Omit<CartItem, "cantidad">) => {
    setItems((prevItems) => {
      // Verificar si el producto ya está en el carrito
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (existingItemIndex >= 0) {
        // Si existe, incrementar la cantidad
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].cantidad += 1
        return updatedItems
      } else {
        // Si no existe, añadirlo con cantidad 1
        return [...prevItems, { ...product, cantidad: 1 }]
      }
    })

    // Mostrar el carrito al añadir un producto
    setIsOpen(true)

    // Cerrar el carrito automáticamente después de 3 segundos
    setTimeout(() => {
      setIsOpen(false)
    }, 3000)
  }

  // Eliminar producto del carrito
  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))

    // Si el carrito queda vacío, eliminar del localStorage
    if (items.length === 1) {
      localStorage.removeItem("cart")
    }
  }

  // Actualizar cantidad de un producto
  const updateQuantity = (id: string, cantidad: number) => {
    if (cantidad < 1) return

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, cantidad } : item)))
  }

  // Vaciar el carrito
  const clearCart = () => {
    setItems([])
    localStorage.removeItem("cart")
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart debe usarse dentro de un CartProvider")
  }
  return context
}

