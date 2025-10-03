"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getOrderByTrackingId } from "@/actions/orders";
import { Package, Search, Loader2 } from "lucide-react";
import Image from "next/image";
import formatPrice from "@/lib/price-formatter";

interface OrderItem {
  id: string | number;
  giftImage: string;
  giftName: string;
  size?: string | null;
  quantity: number;
  giftPrice: number | string;
}

interface Order {
  trackingId: string;
  status: string;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  recipientAddress: string;
  recipientCity?: string | null;
  recipientZipCode?: string | null;
  giftMessage?: string | null;
  estimatedArrival: string | Date;
  createdAt: string | Date;
  totalAmount: number | string;
  items?: OrderItem[];
}

const TrackOrderPage = () => {
  const [trackingId, setTrackingId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingId.trim()) {
      return;
    }

    setIsSearching(true);
    setNotFound(false);
    setOrderData(null);

    try {
      const result = await getOrderByTrackingId(trackingId.trim());

      if (result) {
        setOrderData(result);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      setNotFound(true);
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-400 bg-green-500/20 border-green-500/40";
      case "in_transit":
        return "text-blue-400 bg-blue-500/20 border-blue-500/40";
      case "processing":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/40";
      case "pending":
        return "text-orange-400 bg-orange-500/20 border-orange-500/40";
      case "cancelled":
        return "text-red-400 bg-red-500/20 border-red-500/40";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/40";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-10">
      <div className="container mx-auto px-5 max-w-4xl">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <Package className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-3">
            Track Your Order
          </h1>
          <p className="text-muted-foreground">
            Enter your tracking ID to view your order status
          </p>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <Label htmlFor="trackingId" className="text-white mb-2 block">
              Tracking ID
            </Label>
            <div className="flex gap-3">
              <Input
                id="trackingId"
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="SWIFT-XXXXXXXXX-XXXXXX"
                className="bg-white/5 border-white/10 text-white flex-1"
              />
              <Button
                type="submit"
                className="bg-green-500 text-black hover:bg-green-600"
                disabled={isSearching}
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span className="ml-2">Search</span>
              </Button>
            </div>
          </div>
        </form>

        {notFound && (
          <div className="bg-red-500/10 border border-red-500/40 rounded-lg p-6 text-center">
            <p className="text-red-400">
              Order not found. Please check your tracking ID and try again.
            </p>
          </div>
        )}

        {orderData && (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Order Details</h2>
                  <p className="text-sm text-muted-foreground">
                    Tracking ID:{" "}
                    <code className="text-green-400 font-mono">
                      {orderData.trackingId}
                    </code>
                  </p>
                </div>
                <div
                  className={`px-4 py-2 rounded-full border text-sm font-medium ${getStatusColor(
                    orderData.status
                  )}`}
                >
                  {getStatusLabel(orderData.status)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Recipient
                  </p>
                  <p className="font-medium">{orderData.recipientName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{orderData.recipientEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium">{orderData.recipientPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Estimated Arrival
                  </p>
                  <p className="font-medium">
                    {new Date(orderData.estimatedArrival).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Address</p>
                  <p className="font-medium">
                    {orderData.recipientAddress}
                    {orderData.recipientCity && `, ${orderData.recipientCity}`}
                    {orderData.recipientZipCode &&
                      ` ${orderData.recipientZipCode}`}
                  </p>
                </div>
                {orderData.giftMessage && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground mb-1">
                      Gift Message
                    </p>
                    <p className="font-medium italic">
                      {orderData.giftMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Order Items</h3>
              <div className="space-y-3">
                {orderData.items?.map((item: OrderItem) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-white/5 rounded-lg"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-green-500/40">
                      <Image
                        src={item.giftImage}
                        alt={item.giftName}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold">{item.giftName}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        {item.size && <span>Size: {item.size}</span>}
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-green-400">
                        {formatPrice(Number(item.giftPrice) * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-green-400">
                    {formatPrice(Number(orderData.totalAmount))}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Order Timeline</h3>
              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="flex-1 w-px bg-white/20 my-1"></div>
                  </div>
                  <div className="pb-4">
                    <p className="font-medium">Order Placed</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(orderData.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderPage;
