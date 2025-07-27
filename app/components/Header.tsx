"use client";

import Image from "next/image";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "../contexts/cart-context";

import { useEffect, useState } from "react";

export default function Header() {
  // Scroll progress state
  const [scroll, setScroll] = useState(0);
  const { getTotalItems } = useCart();
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScroll(docHeight > 0 ? (scrolled / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 left-0 z-50 bg-[#476CF4] text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center">
          {/* Logo & Menu */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/shopella-pre-logo.png"
              alt="Shopella Logo"
              width={120}
              height={40}
            />
          </div>
          <div className="hidden md:flex gap-8 text-white font-medium text-base ml-6">
            <a href="#" className="border-b-2 border-white pb-1 font-semibold">
              Home
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-white transition-colors"
            >
              Get Loans
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-white transition-colors"
            >
              Wallet
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-white transition-colors"
            >
              Shopella Deals
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-white transition-colors"
            >
              About Us
            </a>
          </div>
          {/* Spacer */}
          <div className="flex-1" />
          {/* Icons & Buttons */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <FaUser className="text-xl text-white" />
            <Link href="/cart" className="relative">
              <FaShoppingCart className="text-xl text-white" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <button className="bg-white text-[#476CF4] px-4 py-2 rounded-md font-medium hover:opacity-90">
              Login
            </button>
            <button className="bg-[#5c7efb] px-4 py-2 rounded-md font-medium shadow hover:opacity-90">
              BuyLater
            </button>
          </div>
        </div>
      </header>
      {/* Scroll Progress Bar */}
      <div
        className="fixed left-0 w-full h-1 bg-black-200 z-50"
        style={{ top: "85px" }}
      >
        <div
          className="h-1 bg-[#2225d4] transition-all duration-150"
          style={{ width: `${scroll}%` }}
        ></div>
      </div>
    </>
  );
}
