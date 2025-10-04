"use client";

import { useState } from "react";
import { getOrderByTrackingId } from "@/actions/orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Clock, User, Phone, Mail } from "lucide-react";
import Image from "next/image";
import formatPrice from "@/lib/price-formatter";
import { Badge } from "@/components/ui/badge";

interface OrderData {
  id: string;
  trackingId: string;
  status: string;
  estimatedArrival: Date | string;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  recipientAddress: string;
  recipientCity: string | null;
  recipientZipCode: string | null;
  totalAmount: string;
  createdAt: Date;
  updatedAt: Date;
  giftMessage: string | null;
  items?: Array<{
    id: string;
    orderId: string;
    giftId: string;
    giftImage: string;
    giftName: string;
    quantity: number;
    size?: string | null;
    giftPrice: string;
    createdAt: Date;
  }>;
}

const TrackItemPage = () => {
  const [trackingId, setTrackingId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
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
        setOrderData(result as OrderData);
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
        return "bg-green-500";
      case "in_transit":
        return "bg-blue-500";
      case "processing":
        return "bg-yellow-500";
      case "pending":
        return "bg-orange-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getTimeRemaining = (estimatedArrival: string | Date) => {
    const now = new Date();
    const arrival =
      typeof estimatedArrival === "string"
        ? new Date(estimatedArrival)
        : estimatedArrival;
    const diff = arrival.getTime() - now.getTime();

    if (diff <= 0) return "Delivered";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days | ${hours} hrs | ${mins} mins`;
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-10">
      <div className="container mx-auto px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Track Your Package
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter your tracking ID to see real-time delivery updates
            </p>
          </div>

          <form onSubmit={handleSearch} className="mb-10">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter tracking ID (e.g., SWIFT-LT4KF0V-8HG3P5)"
                  className="h-14 pl-12 pr-32 bg-white/5 border-white/20 text-white text-lg placeholder:text-muted-foreground focus:border-green-500"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Button
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 text-black hover:bg-green-600 h-10"
                >
                  {isSearching ? "Searching..." : "Track"}
                </Button>
              </div>
            </div>
          </form>

          {notFound && (
            <div className="max-w-2xl mx-auto bg-red-500/10 border border-red-500/40 rounded-lg p-6 text-center">
              <p className="text-red-400">
                Order not found. Please check your tracking ID and try again.
              </p>
            </div>
          )}

          {orderData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/40 rounded-2xl p-6 shadow-2xl">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    Shipment number
                  </p>
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold font-mono">
                      {orderData.trackingId}
                    </h2>
                    <Badge
                      className={`${getStatusColor(
                        orderData.status
                      )} text-white border-0`}
                    >
                      {getStatusLabel(orderData.status)}
                    </Badge>
                  </div>
                </div>

                {orderData.items && orderData.items.length > 0 && (
                  <div className="mb-6 rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src={orderData.items[0].giftImage}
                      alt={orderData.items[0].giftName}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-green-400">
                    <Clock className="h-5 w-5" />
                    <span className="text-lg font-semibold">
                      {getTimeRemaining(orderData.estimatedArrival)}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">
                        {orderData.recipientAddress}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {orderData.recipientCity}
                        {orderData.recipientZipCode &&
                          `, ${orderData.recipientZipCode}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-muted-foreground mb-3">Receiver</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                        <User className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          {orderData.recipientName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {orderData.recipientEmail}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`tel:${orderData.recipientPhone}`}
                        className="h-10 w-10 rounded-full bg-green-500/20 hover:bg-green-500/30 flex items-center justify-center transition-colors"
                      >
                        <Phone className="h-4 w-4 text-green-400" />
                      </a>
                      <a
                        href={`mailto:${orderData.recipientEmail}`}
                        className="h-10 w-10 rounded-full bg-green-500/20 hover:bg-green-500/30 flex items-center justify-center transition-colors"
                      >
                        <Mail className="h-4 w-4 text-green-400" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative h-[500px] flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/globe.png"
                      alt="World map"
                      fill
                      className="object-contain"
                      priority
                    />

                    <div className="absolute top-[35%] left-[20%]">
                      <div className="relative">
                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
                        <div className="absolute inset-0 w-4 h-4 bg-blue-500/30 rounded-full animate-ping"></div>
                      </div>
                    </div>

                    <div className="absolute top-[45%] left-[48%]">
                      <div className="relative">
                        <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse shadow-lg shadow-orange-500/50"></div>
                        <div className="absolute inset-0 w-4 h-4 bg-orange-500/30 rounded-full animate-ping"></div>
                      </div>
                    </div>

                    <div className="absolute top-[38%] left-[72%]">
                      <div className="relative">
                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
                        <div className="absolute inset-0 w-4 h-4 bg-blue-500/30 rounded-full animate-ping"></div>
                      </div>
                    </div>

                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      style={{ opacity: 0.4 }}
                    >
                      <line
                        x1="20%"
                        y1="35%"
                        x2="48%"
                        y2="45%"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <line
                        x1="48%"
                        y1="45%"
                        x2="72%"
                        y2="38%"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Order Details</h3>
                  <div className="space-y-3">
                    {orderData.items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg overflow-hidden border border-green-500/40">
                            <Image
                              src={item.giftImage}
                              alt={item.giftName}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {item.giftName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                              {item.size && ` • Size: ${item.size}`}
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold text-green-400">
                          {formatPrice(Number(item.giftPrice) * item.quantity)}
                        </p>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                      <span className="font-semibold">Total</span>
                      <span className="text-xl font-bold text-green-400">
                        {formatPrice(Number(orderData.totalAmount))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackItemPage;
