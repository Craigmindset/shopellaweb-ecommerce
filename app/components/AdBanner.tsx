import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBag, CreditCard, Zap } from "lucide-react";

export default function AdBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Banner Image */}
      <div className="relative h-[200px] md:h-[250px] lg:h-[300px]">
        <Image
          src="/ad-banner.jpg"
          alt="Happy woman with shopping bags - Shop with Shopella's flexible payment options"
          fill
          className="object-contain object-center"
          priority
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-l from-purple-900/20 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-end">
            <div className="text-white space-y-4 max-w-lg text-right">
              <div className="space-y-1">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                  Shop Everything, Pay Your Way
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  size="default"
                  className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Start Shopping
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-900 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 bg-transparent"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Learn About BNPL
                </Button>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 pt-2 justify-end">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <Zap className="h-3 w-3 text-yellow-300" />
                  <span className="text-xs font-medium">Instant Approval</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <CreditCard className="h-3 w-3 text-yellow-300" />
                  <span className="text-xs font-medium">0% Interest</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <ShoppingBag className="h-3 w-3 text-yellow-300" />
                  <span className="text-xs font-medium">Quick Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
