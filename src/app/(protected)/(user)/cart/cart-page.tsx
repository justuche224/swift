"use client";

import { useCartStore } from "@/lib/cart";
import Image from "next/image";
import formatPrice from "@/lib/price-formatter";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

const CartPage = () => {
  const { items, removeItem, updateItemQuantity, getTotalPrice } =
    useCartStore();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-10">
        <div className="container mx-auto px-5">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <h1 className="text-3xl font-semibold">Your cart is empty</h1>
            <p className="text-muted-foreground">
              Add some gifts to get started
            </p>
            <Link href="/gift-catalog">
              <Button className="bg-green-500 text-black hover:bg-green-600 mt-4">
                Browse Gifts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-10">
      <div className="container mx-auto px-5">
        <h1 className="text-3xl md:text-4xl font-semibold mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size || "no-size"}`}
                className="bg-white/5 border border-white/10 rounded-lg p-4 flex gap-4"
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-green-500/40">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    {item.size && (
                      <p className="text-sm text-muted-foreground">
                        Size: {item.size}
                      </p>
                    )}
                    <p className="text-green-400 font-semibold mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          if (item.quantity === 1) {
                            removeItem(item.id, item.size);
                          } else {
                            updateItemQuantity(
                              item.id,
                              item.quantity - 1,
                              item.size
                            );
                          }
                        }}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                          updateItemQuantity(
                            item.id,
                            item.quantity + 1,
                            item.size
                          )
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      onClick={() => removeItem(item.id, item.size)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="h-px bg-white/10 my-3"></div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-green-400">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              <Link href="/review" className="block">
                <Button className="w-full bg-green-500 text-black hover:bg-green-600">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/gift-catalog" className="block mt-3">
                <Button className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
