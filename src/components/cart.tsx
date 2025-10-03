"use client";

import { LucideProps } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useCartStore } from "@/lib/cart";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export default function Cart({
  Icon,
  variant = "outline",
}: {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}) {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const cartItemsCount = getTotalItems();

  return (
    <Link href="/cart">
      <Button variant={variant} size="icon" className="relative">
        <Icon className="h-5 w-5" />
        {cartItemsCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
            {cartItemsCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
