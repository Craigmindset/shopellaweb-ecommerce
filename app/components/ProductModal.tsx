"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ShoppingCart, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  specifications: string[]
  gallery: string[]
}

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={product.gallery[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded border-2 ${
                    selectedImage === index ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
              <p className="text-3xl font-bold text-gray-900">${product.price.toLocaleString()}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Specifications</h3>
              <ul className="space-y-1">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Share</h3>
              <div className="flex space-x-3">
                <Button size="sm" variant="outline">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Instagram className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button size="lg" className="w-full">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>

            <div className="text-center text-sm text-gray-600">
              Want this item?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline font-medium">
                access our wallet loan
              </Link>{" "}
              to purchase
            </div>
          </div>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </DialogContent>
    </Dialog>
  )
}
