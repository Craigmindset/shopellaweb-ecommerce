"use client"

import Image from "next/image"

const brands = [
  { id: 1, name: "Samsung", logo: "/brands/samsung.png" },
  { id: 2, name: "Apple", logo: "/brands/apple.svg" },
  { id: 3, name: "LG", logo: "/brands/lg.png" },
  { id: 4, name: "Hisense", logo: "/brands/hisense.png" },
  { id: 5, name: "Techno", logo: "/brands/techno.png" },
  { id: 6, name: "Binatone", logo: "/brands/binatone.png" },
  { id: 7, name: "Polystar", logo: "/brands/polystar.jpeg" },
]

export default function CategorySection() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">What are you Shopping today?</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1 justify-items-center">
          {brands.map((brand) => (
            <div key={brand.id} className="flex flex-col items-center cursor-pointer group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:scale-110 group-hover:-translate-y-2">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} logo`}
                  width={40}
                  height={40}
                  className="object-contain max-w-[70%] max-h-[70%] filter group-hover:brightness-110 transition-all duration-300"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center mt-0.5 group-hover:text-blue-600 transition-colors duration-300">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
