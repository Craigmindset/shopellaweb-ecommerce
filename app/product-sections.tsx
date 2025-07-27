"use client"

import Image from "next/image"
import { Heart, Eye, ShoppingCart, ChevronRight, Facebook, Twitter, Instagram, CreditCard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { useCart } from "../contexts/cart-context"

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  images: string[]
  alt: string
  discount?: string
  likes: number
  description: string
  features: string[]
  rating: number
  reviews: number
}

const phonesLaptops: Product[] = [
  {
    id: 11,
    name: "iPhone 15 Pro Max",
    price: "₦1,200,000",
    originalPrice: "₦1,350,000",
    image: "/placeholder.svg?height=192&width=192&text=iPhone+15+Pro",
    images: [
      "/placeholder.svg?height=400&width=400&text=iPhone+Main",
      "/placeholder.svg?height=400&width=400&text=iPhone+Side",
      "/placeholder.svg?height=400&width=400&text=iPhone+Back",
      "/placeholder.svg?height=400&width=400&text=iPhone+Screen",
    ],
    alt: "iPhone 15 Pro Max",
    discount: "-11%",
    likes: 45,
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system.",
    features: ["A17 Pro Chip", "Titanium Design", "48MP Camera", "USB-C"],
    rating: 4.9,
    reviews: 234,
  },
  {
    id: 12,
    name: "MacBook Air M3",
    price: "₦850,000",
    image: "/placeholder.svg?height=192&width=192&text=MacBook+Air",
    images: [
      "/placeholder.svg?height=400&width=400&text=MacBook+Main",
      "/placeholder.svg?height=400&width=400&text=MacBook+Side",
      "/placeholder.svg?height=400&width=400&text=MacBook+Screen",
      "/placeholder.svg?height=400&width=400&text=MacBook+Keyboard",
    ],
    alt: "MacBook Air M3",
    likes: 32,
    description: "Ultra-thin laptop with M3 chip for incredible performance and all-day battery life.",
    features: ["M3 Chip", "13.6-inch Display", "18-hour Battery", "8GB RAM"],
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 13,
    name: "Samsung Galaxy S24 Ultra",
    price: "₦980,000",
    originalPrice: "₦1,100,000",
    image: "/placeholder.svg?height=192&width=192&text=Galaxy+S24",
    images: [
      "/placeholder.svg?height=400&width=400&text=Galaxy+Main",
      "/placeholder.svg?height=400&width=400&text=Galaxy+Side",
      "/placeholder.svg?height=400&width=400&text=Galaxy+Back",
      "/placeholder.svg?height=400&width=400&text=Galaxy+Screen",
    ],
    alt: "Samsung Galaxy S24 Ultra",
    discount: "-11%",
    likes: 28,
    description: "Premium Android phone with S Pen, advanced AI features, and professional cameras.",
    features: ["S Pen Included", "200MP Camera", "AI Features", "5000mAh Battery"],
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 14,
    name: "Dell XPS 13",
    price: "₦650,000",
    image: "/placeholder.svg?height=192&width=192&text=Dell+XPS",
    images: [
      "/placeholder.svg?height=400&width=400&text=Dell+Main",
      "/placeholder.svg?height=400&width=400&text=Dell+Side",
      "/placeholder.svg?height=400&width=400&text=Dell+Screen",
      "/placeholder.svg?height=400&width=400&text=Dell+Keyboard",
    ],
    alt: "Dell XPS 13",
    likes: 19,
    description: "Premium ultrabook with stunning display and powerful performance for professionals.",
    features: ["Intel i7", "16GB RAM", "512GB SSD", "13.4-inch Display"],
    rating: 4.6,
    reviews: 98,
  },
  {
    id: 15,
    name: "iPad Pro 12.9",
    price: "₦750,000",
    image: "/placeholder.svg?height=192&width=192&text=iPad+Pro",
    images: [
      "/placeholder.svg?height=400&width=400&text=iPad+Main",
      "/placeholder.svg?height=400&width=400&text=iPad+Side",
      "/placeholder.svg?height=400&width=400&text=iPad+Screen",
      "/placeholder.svg?height=400&width=400&text=iPad+Accessories",
    ],
    alt: "iPad Pro 12.9",
    likes: 37,
    description: "Professional tablet with M2 chip, perfect for creative work and productivity.",
    features: ["M2 Chip", "12.9-inch Display", "Apple Pencil Support", "Thunderbolt"],
    rating: 4.8,
    reviews: 167,
  },
]

const electronics: Product[] = [
  {
    id: 21,
    name: "Sony WH-1000XM5",
    price: "₦180,000",
    originalPrice: "₦220,000",
    image: "/placeholder.svg?height=192&width=192&text=Sony+Headphones",
    images: [
      "/placeholder.svg?height=400&width=400&text=Headphones+Main",
      "/placeholder.svg?height=400&width=400&text=Headphones+Side",
      "/placeholder.svg?height=400&width=400&text=Headphones+Case",
      "/placeholder.svg?height=400&width=400&text=Headphones+Controls",
    ],
    alt: "Sony WH-1000XM5",
    discount: "-18%",
    likes: 67,
    description: "Industry-leading noise canceling headphones with exceptional sound quality.",
    features: ["Active Noise Canceling", "30-hour Battery", "Quick Charge", "Touch Controls"],
    rating: 4.9,
    reviews: 445,
  },
  {
    id: 22,
    name: 'Samsung 65" QLED TV',
    price: "₦850,000",
    image: "/placeholder.svg?height=192&width=192&text=Samsung+TV",
    images: [
      "/placeholder.svg?height=400&width=400&text=TV+Main",
      "/placeholder.svg?height=400&width=400&text=TV+Side",
      "/placeholder.svg?height=400&width=400&text=TV+Remote",
      "/placeholder.svg?height=400&width=400&text=TV+Stand",
    ],
    alt: "Samsung 65 QLED TV",
    likes: 23,
    description: "Premium QLED TV with 4K resolution and smart features for the ultimate viewing experience.",
    features: ["4K QLED", "Smart TV", "HDR10+", "Gaming Mode"],
    rating: 4.7,
    reviews: 134,
  },
  {
    id: 23,
    name: "Canon EOS R6 Mark II",
    price: "₦1,450,000",
    image: "/placeholder.svg?height=192&width=192&text=Canon+Camera",
    images: [
      "/placeholder.svg?height=400&width=400&text=Camera+Main",
      "/placeholder.svg?height=400&width=400&text=Camera+Side",
      "/placeholder.svg?height=400&width=400&text=Camera+Lens",
      "/placeholder.svg?height=400&width=400&text=Camera+Screen",
    ],
    alt: "Canon EOS R6 Mark II",
    likes: 15,
    description: "Professional mirrorless camera with advanced autofocus and video capabilities.",
    features: ["24.2MP Sensor", "4K Video", "In-Body Stabilization", "Dual Card Slots"],
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 24,
    name: "Nintendo Switch OLED",
    price: "₦195,000",
    image: "/placeholder.svg?height=192&width=192&text=Nintendo+Switch",
    images: [
      "/placeholder.svg?height=400&width=400&text=Switch+Main",
      "/placeholder.svg?height=400&width=400&text=Switch+Dock",
      "/placeholder.svg?height=400&width=400&text=Switch+Controllers",
      "/placeholder.svg?height=400&width=400&text=Switch+Games",
    ],
    alt: "Nintendo Switch OLED",
    likes: 89,
    description: "Gaming console with vibrant OLED screen for portable and docked gaming.",
    features: ["7-inch OLED Screen", "Enhanced Audio", "64GB Storage", "Joy-Con Controllers"],
    rating: 4.6,
    reviews: 267,
  },
  {
    id: 25,
    name: "Dyson V15 Detect",
    price: "₦320,000",
    originalPrice: "₦380,000",
    image: "/placeholder.svg?height=192&width=192&text=Dyson+Vacuum",
    images: [
      "/placeholder.svg?height=400&width=400&text=Vacuum+Main",
      "/placeholder.svg?height=400&width=400&text=Vacuum+Attachments",
      "/placeholder.svg?height=400&width=400&text=Vacuum+Display",
      "/placeholder.svg?height=400&width=400&text=Vacuum+Charging",
    ],
    alt: "Dyson V15 Detect",
    discount: "-16%",
    likes: 34,
    description: "Advanced cordless vacuum with laser dust detection and powerful suction.",
    features: ["Laser Detection", "60min Runtime", "LCD Display", "5-stage Filtration"],
    rating: 4.7,
    reviews: 178,
  },
]

const deals: Product[] = [
  {
    id: 31,
    name: "Apple AirPods Pro 2",
    price: "₦145,000",
    originalPrice: "₦195,000",
    image: "/placeholder.svg?height=192&width=192&text=AirPods+Pro",
    images: [
      "/placeholder.svg?height=400&width=400&text=AirPods+Main",
      "/placeholder.svg?height=400&width=400&text=AirPods+Case",
      "/placeholder.svg?height=400&width=400&text=AirPods+Charging",
      "/placeholder.svg?height=400&width=400&text=AirPods+Tips",
    ],
    alt: "Apple AirPods Pro 2",
    discount: "-26%",
    likes: 156,
    description: "Premium wireless earbuds with active noise cancellation and spatial audio.",
    features: ["Active Noise Cancellation", "Spatial Audio", "6-hour Battery", "MagSafe Charging"],
    rating: 4.8,
    reviews: 892,
  },
  {
    id: 32,
    name: "Samsung Galaxy Watch 6",
    price: "₦125,000",
    originalPrice: "₦165,000",
    image: "/placeholder.svg?height=192&width=192&text=Galaxy+Watch",
    images: [
      "/placeholder.svg?height=400&width=400&text=Watch+Main",
      "/placeholder.svg?height=400&width=400&text=Watch+Side",
      "/placeholder.svg?height=400&width=400&text=Watch+Bands",
      "/placeholder.svg?height=400&width=400&text=Watch+Apps",
    ],
    alt: "Samsung Galaxy Watch 6",
    discount: "-24%",
    likes: 78,
    description: "Advanced smartwatch with health monitoring and fitness tracking features.",
    features: ["Health Monitoring", "GPS", "Water Resistant", "40mm Display"],
    rating: 4.5,
    reviews: 234,
  },
  {
    id: 33,
    name: "JBL Charge 5",
    price: "₦85,000",
    originalPrice: "₦120,000",
    image: "/placeholder.svg?height=192&width=192&text=JBL+Speaker",
    images: [
      "/placeholder.svg?height=400&width=400&text=Speaker+Main",
      "/placeholder.svg?height=400&width=400&text=Speaker+Side",
      "/placeholder.svg?height=400&width=400&text=Speaker+Ports",
      "/placeholder.svg?height=400&width=400&text=Speaker+Colors",
    ],
    alt: "JBL Charge 5",
    discount: "-29%",
    likes: 92,
    description: "Portable Bluetooth speaker with powerful sound and power bank functionality.",
    features: ["20-hour Playtime", "IP67 Waterproof", "Power Bank", "JBL Pro Sound"],
    rating: 4.6,
    reviews: 567,
  },
  {
    id: 34,
    name: "Logitech MX Master 3S",
    price: "₦45,000",
    originalPrice: "₦65,000",
    image: "/placeholder.svg?height=192&width=192&text=Logitech+Mouse",
    images: [
      "/placeholder.svg?height=400&width=400&text=Mouse+Main",
      "/placeholder.svg?height=400&width=400&text=Mouse+Side",
      "/placeholder.svg?height=400&width=400&text=Mouse+Buttons",
      "/placeholder.svg?height=400&width=400&text=Mouse+Charging",
    ],
    alt: "Logitech MX Master 3S",
    discount: "-31%",
    likes: 67,
    description: "Premium wireless mouse with advanced features for productivity and creativity.",
    features: ["8K DPI Sensor", "70-day Battery", "Multi-device", "Quiet Clicks"],
    rating: 4.7,
    reviews: 345,
  },
  {
    id: 35,
    name: "Anker PowerCore 26800",
    price: "₦35,000",
    originalPrice: "₦50,000",
    image: "/placeholder.svg?height=192&width=192&text=Anker+PowerBank",
    images: [
      "/placeholder.svg?height=400&width=400&text=PowerBank+Main",
      "/placeholder.svg?height=400&width=400&text=PowerBank+Ports",
      "/placeholder.svg?height=400&width=400&text=PowerBank+LED",
      "/placeholder.svg?height=400&width=400&text=PowerBank+Cables",
    ],
    alt: "Anker PowerCore 26800",
    discount: "-30%",
    likes: 123,
    description: "High-capacity portable charger with fast charging for multiple devices.",
    features: ["26800mAh Capacity", "3 USB Ports", "Fast Charging", "LED Indicator"],
    rating: 4.5,
    reviews: 678,
  },
]

// Mini popup component for success notification
function SuccessPopup({ show, productName }: { show: boolean; productName: string }) {
  if (!show) return null

  return (
    <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-2 duration-300">
      <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-sm">
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-green-500" />
        </div>
        <div>
          <p className="font-medium text-sm">Added to cart!</p>
          <p className="text-xs opacity-90 line-clamp-1">{productName}</p>
        </div>
      </div>
    </div>
  )
}

function ProductModal({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
    setShowSuccessPopup(true)
    setTimeout(() => setShowSuccessPopup(false), 3000)
  }

  return (
    <>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid grid-cols-2 gap-8 p-8">
          {/* Left Side - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.alt}
                fill
                className="object-cover"
              />
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative h-20 bg-gray-100 rounded cursor-pointer border-2 ${
                    selectedImage === index ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.alt} view ${index + 1}`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Product Name and Rating */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? "★" : "☆"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
              )}
              {product.discount && <Badge className="bg-red-500 text-white">{product.discount}</Badge>}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Product Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Share Product */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Share this product</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Facebook className="w-4 h-4 text-blue-600" />
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Twitter className="w-4 h-4 text-blue-400" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  Instagram
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>

            {/* Payment Options */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Flexible Payment</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Buy Now Pay Later | 12 months installment available</p>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
      <SuccessPopup show={showSuccessPopup} productName={product.name} />
    </>
  )
}

function ProductSection({ title, products }: { title: string; products: Product[] }) {
  const { addToCart } = useCart()
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [addedProductName, setAddedProductName] = useState("")

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    setAddedProductName(product.name)
    setShowSuccessPopup(true)
    setTimeout(() => setShowSuccessPopup(false), 3000)
  }

  return (
    <>
      <div className="bg-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="relative group cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.alt}
                    fill
                    className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Discount Badge */}
                  {product.discount && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">{product.discount}</Badge>
                  )}

                  {/* Like Button */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-white text-sm">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-black/20 p-1 h-auto">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <span>{product.likes}</span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Button
                      size="sm"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/90 text-gray-900 hover:bg-white border-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <ProductModal product={product} />
                    </Dialog>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-2 sm:p-3">
                  <h3 className="font-medium text-xs sm:text-sm text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="font-bold text-blue-600 text-sm sm:text-base">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <SuccessPopup show={showSuccessPopup} productName={addedProductName} />
    </>
  )
}

export default function ProductSections() {
  return (
    <div className="space-y-8">
      <ProductSection title="Phones & Laptops" products={phonesLaptops} />
      <ProductSection title="Electronics" products={electronics} />
      <ProductSection title="Deals" products={deals} />
    </div>
  )
}
