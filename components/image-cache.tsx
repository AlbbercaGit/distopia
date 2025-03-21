"use client"

import { useState, createContext, useContext, type ReactNode } from "react"

interface ImageCacheContextType {
  cache: Map<string, string>
  addToCache: (url: string, dataUrl: string) => void
  getFromCache: (url: string) => string | undefined
  preloadImage: (url: string) => Promise<void>
}

const ImageCacheContext = createContext<ImageCacheContextType>({
  cache: new Map(),
  addToCache: () => {},
  getFromCache: () => undefined,
  preloadImage: async () => {},
})

export const useImageCache = () => useContext(ImageCacheContext)

interface ImageCacheProviderProps {
  children: ReactNode
}

export function ImageCacheProvider({ children }: ImageCacheProviderProps) {
  const [cache] = useState<Map<string, string>>(new Map())

  const addToCache = (url: string, dataUrl: string) => {
    cache.set(url, dataUrl)
  }

  const getFromCache = (url: string) => {
    return cache.get(url)
  }

  const preloadImage = async (url: string): Promise<void> => {
    if (cache.has(url)) return

    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        try {
          // Crear un canvas para convertir la imagen a data URL
          const canvas = document.createElement("canvas")
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.drawImage(img, 0, 0)
            const dataUrl = canvas.toDataURL("image/webp", 0.8)
            addToCache(url, dataUrl)
          }
          resolve()
        } catch (err) {
          console.error("Error caching image:", err)
          resolve() // Resolver de todos modos para no bloquear
        }
      }
      img.onerror = () => {
        console.error("Error loading image:", url)
        resolve() // Resolver de todos modos para no bloquear
      }
      img.src = url
    })
  }

  const value = {
    cache,
    addToCache,
    getFromCache,
    preloadImage,
  }

  return <ImageCacheContext.Provider value={value}>{children}</ImageCacheContext.Provider>
}

