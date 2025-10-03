"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  images: { url: string }[];
  description: string;
  sizes?: string;
}

const AddToCart = ({
  product,
  selectedSize,
}: {
  product: Product;
  selectedSize?: string;
}) => {
  const { items, addItem, removeItem, updateItemQuantity } = useCartStore();
  const cartItem = items.find((item) => {
    const itemKey = item.size ? `${item.id}-${item.size}` : item.id;
    const productKey = selectedSize
      ? `${product.id}-${selectedSize}`
      : product.id;
    return itemKey === productKey;
  });

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
      description: product.description,
      size: selectedSize,
      quantity: 1,
    });
    toast.success("Item added to cart");
  };

  const handleIncrement = () => {
    if (cartItem) {
      updateItemQuantity(product.id, cartItem.quantity + 1, selectedSize);
      toast.success("Item quantity updated");
    }
  };

  const handleDecrement = () => {
    if (cartItem) {
      if (cartItem.quantity === 1) {
        removeItem(product.id, selectedSize);
        toast.success("Item removed from cart");
      } else {
        updateItemQuantity(product.id, cartItem.quantity - 1, selectedSize);
        toast.success("Item quantity updated");
      }
    }
  };

  return (
    <>
      {!cartItem ? (
        <Button
          size="sm"
          className="w-full gap-1 text-xs bg-green-500 text-black hover:bg-green-600"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-3 w-3" />
          Add to Cart
        </Button>
      ) : (
        <div className="flex items-center justify-between w-full">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 text-black"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDecrement();
            }}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-sm font-medium">{cartItem.quantity}</span>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 text-black"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleIncrement();
            }}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      )}
    </>
  );
};

export default AddToCart;
