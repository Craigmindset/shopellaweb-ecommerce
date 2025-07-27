"use client"

import Image from "next/image"

const brands = [
  { name: "Samsung", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Apple", logo: "/placeholder.svg?height=60&width=120" },
  { name: "LG", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Hisense", logo: "/placeholder.svg?height=60&width=120" },
  { name: "TCL", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Dell", logo: "/placeholder.svg?height=60&width=120" },
  { name: "HP", logo: "/placeholder.svg?height=60&width=120" },
]

export default function BrandSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What are you Shopping today?</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group cursor-pointer transition-all duration-300 hover:scale-110 p-4 rounded-lg hover:shadow-lg"
            >
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={`${brand.name} logo`}
                width={120}
                height={60}
                className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
