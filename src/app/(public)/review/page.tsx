"use client";

import { useCartStore } from "@/lib/cart";
import Image from "next/image";
import formatPrice from "@/lib/price-formatter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createOrder } from "@/actions/orders";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Copy } from "lucide-react";

const ReviewPage = () => {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();

  const [recipientInfo, setRecipientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{
    trackingId: string;
    estimatedArrival: string;
  } | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRecipientInfo({
      ...recipientInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !recipientInfo.name ||
      !recipientInfo.email ||
      !recipientInfo.phone ||
      !recipientInfo.address
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createOrder(
        items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          image: item.image,
        })),
        recipientInfo,
        totalPrice
      );

      if (result.success && result.trackingId) {
        setOrderDetails({
          trackingId: result.trackingId,
          estimatedArrival: result.estimatedArrival || "",
        });
        setShowSuccessDialog(true);
        toast.success("Order placed successfully!");
        setTimeout(() => {
          clearCart();
        }, 100);
      } else {
        toast.error(result.error || "Failed to place order");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred while placing your order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTracking = () => {
    if (orderDetails?.trackingId) {
      navigator.clipboard.writeText(orderDetails.trackingId);
      setCopiedTracking(true);
      toast.success("Tracking ID copied!");
      setTimeout(() => setCopiedTracking(false), 2000);
    }
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    router.push("/");
  };

  if (items.length === 0 && !showSuccessDialog) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-10">
        <div className="container mx-auto px-5">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <h1 className="text-3xl font-semibold">No items to review</h1>
            <p className="text-muted-foreground">
              Add some gifts to your cart first
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
          Review Order
        </h1>

        <form onSubmit={handleCheckout}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Recipient Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Full Name <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={recipientInfo.name}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white mt-1"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={recipientInfo.email}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white mt-1"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white">
                      Phone <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={recipientInfo.phone}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white mt-1"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-white">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      value={recipientInfo.city}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white mt-1"
                      placeholder="New York"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-white">
                      Address <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      required
                      value={recipientInfo.address}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white mt-1"
                      placeholder="123 Main St, Apartment 4B"
                    />
                  </div>

                  <div>
                    <Label htmlFor="zipCode" className="text-white">
                      Zip Code
                    </Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      value={recipientInfo.zipCode}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white mt-1"
                      placeholder="10001"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="message" className="text-white">
                      Gift Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={recipientInfo.message}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white mt-1"
                      placeholder="Add a personal message to your gift..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Order Items</h2>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.size || "no-size"}`}
                      className="flex gap-4 p-3 bg-white/5 rounded-lg"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-green-500/40">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          {item.size && <span>Size: {item.size}</span>}
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-green-400">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatPrice(0)}</span>
                  </div>
                  <div className="h-px bg-white/10 my-3"></div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-green-400">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full bg-green-500 text-black hover:bg-green-600 mb-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </Button>
                  <Link href="/cart" className="block text-black">
                    <Button variant="outline" className="w-full" type="button">
                      Back to Cart
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-black text-white border border-green-500/40">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <DialogTitle className="text-2xl text-center">
              Order Placed Successfully!
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Your gift package is being prepared for delivery
            </DialogDescription>
          </DialogHeader>

          {orderDetails && (
            <div className="space-y-4 mt-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Tracking ID
                </p>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-green-400 font-mono text-lg">
                    {orderDetails.trackingId}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyTracking}
                    className="h-8 w-8 p-0"
                  >
                    {copiedTracking ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  Estimated Arrival
                </p>
                <p className="text-lg font-semibold">
                  {new Date(orderDetails.estimatedArrival).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/40 rounded-lg p-4">
                <p className="text-sm text-green-400">
                  📧 A confirmation email has been sent to {recipientInfo.email}
                </p>
              </div>

              <div className="space-y-2">
                <Link href="/track-item" className="block">
                  <Button
                    className="w-full bg-green-500 text-black hover:bg-green-600"
                    onClick={() => setShowSuccessDialog(false)}
                  >
                    Track Your Order
                  </Button>
                </Link>
                <Button
                  onClick={handleCloseDialog}
                  variant="outline"
                  className="w-full text-black"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewPage;
