"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, Eye, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductModal from "./ProductModal"

const products = [
  {
    id: 1,
    name: "Samsung Galaxy S24",
    price: 999,
    image: "/placeholder.svg?height=300&width=300",
    description: "Latest Samsung flagship smartphone with advanced AI features",
    specifications: ['6.2" Dynamic AMOLED display', "256GB storage", "50MP camera", "4000mAh battery"],
    gallery: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
  },
  {
    id: 2,
    name: 'MacBook Pro 14"',
    price: 1999,
    image: "/placeholder.svg?height=300&width=300",
    description: "Powerful laptop with M3 chip for professional workflows",
    specifications: ['14" Liquid Retina XDR display', "M3 Pro chip", "512GB SSD", "18GB unified memory"],
    gallery: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
  },
  {
    id: 3,
    name: 'LG OLED TV 55"',
    price: 1299,
    image: "/placeholder.svg?height=300&width=300",
    description: "Premium OLED TV with perfect blacks and vibrant colors",
    specifications: ['55" OLED display', "4K resolution", "HDR10 support", "webOS smart platform"],
    gallery: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
  },
  {
    id: 4,
    name: "Dell XPS 13",
    price: 1199,
    image: "/placeholder.svg?height=300&width=300",
    description: "Ultra-portable laptop with premium build quality",
    specifications: ['13.4" InfinityEdge display', "Intel Core i7", "512GB SSD", "16GB RAM"],
    gallery: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
  },
  {
    id: 5,
    name: "iPhone 15 Pro",
    price: 1099,
    image: "/placeholder.svg?height=300&width=300",
    description: "Latest iPhone with titanium design and advanced camera system",
    specifications: ['6.1" Super Retina XDR display', "A17 Pro chip", "256GB storage", "Pro camera system"],
    gallery: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
  },
  {
    id: 6,
    name: "HP Spectre x360",
    price: 1399,
    image: "/placeholder.svg?height=300&width=300",
    description: "Versatile 2-in-1 laptop with premium design",
    specifications: ['13.5" OLED touchscreen', "Intel Core i7", "1TB SSD", "16GB RAM"],
    gallery: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
  },
]

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            <Gift className="h-8 w-8 text-orange-500 mr-3 animate-bounce" />
            <h2 className="text-3xl font-bold text-gray-900">Top Deals</h2>
          </div>
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white border-white hover:bg-gray-100"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-lg font-bold text-gray-900">${product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  )
}
