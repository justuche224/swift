"use client";

import { getOrderById, updateOrderStatus, deleteOrder } from "@/actions/admin";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Trash2 } from "lucide-react";
import Image from "next/image";
import formatPrice from "@/lib/price-formatter";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const OrderDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: order, isLoading } = useQuery({
    queryKey: ["admin-order", id],
    queryFn: () => getOrderById(id),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-order", id] });
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Order status updated");
    },
    onError: () => {
      toast.error("Failed to update order status");
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      toast.success("Order deleted successfully");
      router.push("/admin/orders");
    },
    onError: () => {
      toast.error("Failed to delete order");
    },
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500/20 text-green-400 border-green-500/40";
      case "in_transit":
        return "bg-blue-500/20 text-blue-400 border-blue-500/40";
      case "processing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
      case "pending":
        return "bg-orange-500/20 text-orange-400 border-orange-500/40";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/40";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/40";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const handleStatusChange = (newStatus: string) => {
    if (order) {
      updateStatusMutation.mutate({ orderId: order.id, status: newStatus });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6">
        <div className="bg-white/5 border border-white/10 rounded-lg p-8">
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-6">
        <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
          <p className="text-muted-foreground">Order not found</p>
          <Link href="/admin/orders">
            <Button className="mt-4" variant="outline">
              Back to Orders
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6">
      <div className="mb-6">
        <Link href="/admin/orders">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Order Details</h1>
            <p className="text-muted-foreground mt-1 font-mono">
              {order.trackingId}
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Order
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-black text-white border border-red-500/40">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Order</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  Are you sure you want to delete this order? This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteOrderMutation.mutate(order.id)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Order Status
            </h2>
            <div className="flex items-center gap-4">
              <Badge
                variant="outline"
                className={`${getStatusColor(
                  order.status
                )} text-base px-4 py-2`}
              >
                {getStatusLabel(order.status)}
              </Badge>
              <Select value={order.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-48 bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Change status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recipient Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Name</p>
                <p className="text-white font-medium">{order.recipientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="text-white font-medium">{order.recipientEmail}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                <p className="text-white font-medium">{order.recipientPhone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Estimated Arrival
                </p>
                <p className="text-white font-medium">
                  {new Date(order.estimatedArrival).toLocaleDateString(
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
                <p className="text-white font-medium">
                  {order.recipientAddress}
                  {order.recipientCity && `, ${order.recipientCity}`}
                  {order.recipientZipCode && ` ${order.recipientZipCode}`}
                </p>
              </div>
              {order.giftMessage && (
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">
                    Gift Message
                  </p>
                  <p className="text-white font-medium italic">
                    &ldquo;{order.giftMessage}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Order Items
            </h2>
            <div className="space-y-3">
              {order.items?.map((item) => (
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
                    <h4 className="font-semibold text-white">
                      {item.giftName}
                    </h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      {item.size && <span>Size: {item.size}</span>}
                      <span>Qty: {item.quantity}</span>
                      <span>@ {formatPrice(Number(item.giftPrice))}</span>
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
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Order Date</span>
                <span className="text-white">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="text-white">
                  {new Date(order.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="h-px bg-white/10 my-3"></div>
              <div className="flex justify-between font-semibold text-lg">
                <span className="text-white">Total Amount</span>
                <span className="text-green-400">
                  {formatPrice(Number(order.totalAmount))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
