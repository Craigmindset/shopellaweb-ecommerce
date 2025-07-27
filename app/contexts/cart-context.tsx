"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface CartItem {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  images: string[]
  alt: string
  discount?: string
  quantity: number
  description: string
  features: string[]
  rating: number
  reviews: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: any) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  getTotalItems: () => number
  getTotalPrice: () => string
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (product: any) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            images: product.images || [product.image],
            alt: product.alt,
            discount: product.discount,
            quantity: 1,
            description: product.description || "",
            features: product.features || [],
            rating: product.rating || 0,
            reviews: product.reviews || 0,
          },
        ]
      }
    })

    // Show a brief success message
    console.log(`Added ${product.name} to cart`)
  }

  const removeFromCart = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    const total = items.reduce((sum, item) => {
      const price = Number.parseFloat(item.price.replace(/[₦,]/g, ""))
      return sum + price * item.quantity
    }, 0)
    return `₦${total.toLocaleString()}`
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
