"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ScrollPopupNotificationProps {
  title?: string
  description?: string
  image?: string
  ctaText?: string
  ctaAction?: () => void
  scrollThreshold?: number
}

export default function ScrollPopupNotification({
  title = "🎉 Special Offer Just for You!",
  description = "Get 20% off your first purchase when you get special offer. Limited time offer!",
  image = "/placeholder.svg?height=80&width=80&text=Offer",
  ctaText = "Special Offer",
  ctaAction = () => console.log("CTA clicked"),
  scrollThreshold = 300,
}: ScrollPopupNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!hasTriggered && window.scrollY > scrollThreshold) {
        setIsVisible(true)
        setHasTriggered(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollThreshold, hasTriggered])

  const handleMinimize = () => {
    setIsMinimized(true)
  }

  const handleClose = () => {
    setIsClosed(true)
  }

  const handleExpand = () => {
    setIsMinimized(false)
  }

  // Don't render if closed
  if (isClosed) return null

  return (
    <>
      {/* Full Popup */}
      {isVisible && !isMinimized && (
        <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-left-4 duration-500">
          <Card className="w-80 sm:w-96 shadow-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-0">
              {/* Header with controls */}
              <div className="flex justify-between items-center p-3 border-b border-blue-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-600">Limited Time</span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-blue-100 text-gray-500 hover:text-gray-700"
                    onClick={handleMinimize}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-red-100 text-gray-500 hover:text-red-600"
                    onClick={handleClose}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt="Notification"
                      fill
                      className="object-cover rounded-lg"
                    />
                    {/* Sparkle effect */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                      <span className="text-xs">✨</span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm leading-tight">{title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3">{description}</p>

                    {/* CTA Button */}
                    <Button
                      onClick={ctaAction}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm py-2 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Special Offer
                    </Button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 bg-gray-200 rounded-full h-1">
                  <div className="bg-gradient-to-r from-blue-500 to-green-500 h-1 rounded-full w-3/4 animate-pulse"></div>
                </div>
                <p className="text-xs text-center text-gray-500 mt-2">Offer expires in 24 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Minimized Popup (floats to right) */}
      {isVisible && isMinimized && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right-4 duration-300">
          <Card
            className="w-14 h-14 shadow-xl border-2 border-blue-200 bg-gradient-to-br from-blue-600 to-blue-700 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={handleExpand}
          >
            <CardContent className="p-0 h-full flex items-center justify-center relative">
              {/* Notification dot */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-xs text-white font-bold">!</span>
              </div>

              {/* Icon */}
              <ShoppingBag className="w-6 h-6 text-white" />

              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-lg bg-blue-400 animate-ping opacity-20"></div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
