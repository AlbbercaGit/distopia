"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Tipo para el usuario
export interface User {
  username: string
  role: "admin" | "user"
  displayName: string
}

// Interfaz del contexto de autenticación
interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Proveedor del contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Verificar si hay una sesión guardada al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error al cargar la sesión:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Función de inicio de sesión
  const login = async (username: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simular una petición a un servidor
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Validar credenciales (solo admin/admin por ahora)
      if (username === "admin" && password === "admin") {
        const userData: User = {
          username: "admin",
          role: "admin",
          displayName: "ADMINISTRADOR",
        }

        // Guardar en localStorage y estado
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)

        // Redirigir al usuario
        router.push("/")
      } else {
        setError("CREDENCIALES INVÁLIDAS")
      }
    } catch (error) {
      setError("ERROR DE CONEXIÓN")
      console.error("Error de inicio de sesión:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Función de cierre de sesión
  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}

