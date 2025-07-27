"use client";

import { useCart } from "../contexts/cart-context";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } =
    useCart();

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6 mb-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white rounded-lg shadow p-4"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-600">{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="px-2">{item.quantity}</span>
                    <Button
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-xl font-bold">Total: {getTotalPrice()}</span>
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
            Checkout
          </Button>
        </>
      )}
    </section>
  );
}
