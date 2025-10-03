"use client";

import { getAllOrders, getAllGifts } from "@/actions/admin";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Gift, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const { data: ordersData } = useQuery({
    queryKey: ["admin-orders-stats"],
    queryFn: () => getAllOrders(1, 100),
  });

  const { data: gifts } = useQuery({
    queryKey: ["admin-gifts"],
    queryFn: getAllGifts,
  });

  const totalOrders = ordersData?.pagination.totalCount || 0;
  const pendingOrders =
    ordersData?.orders.filter((o) => o.status === "pending").length || 0;
  const processingOrders =
    ordersData?.orders.filter(
      (o) => o.status === "processing" || o.status === "in_transit"
    ).length || 0;
  const completedOrders =
    ordersData?.orders.filter((o) => o.status === "delivered").length || 0;
  const totalGifts = gifts?.length || 0;
  const activeGifts = gifts?.filter((g) => g.isActive).length || 0;

  const totalRevenue =
    ordersData?.orders
      .filter((o) => o.status === "delivered")
      .reduce((sum, order) => sum + Number(order.totalAmount), 0) || 0;

  return (
    <div className="container mx-auto px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your store.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {pendingOrders} pending
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Processing
            </CardTitle>
            <Package className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {processingOrders}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Orders in progress
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Gifts
            </CardTitle>
            <Gift className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalGifts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeGifts} active
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {completedOrders} completed orders
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {ordersData?.orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {order.recipientName}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {order.trackingId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-400">
                    ${Number(order.totalAmount).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {order.status.replace(/_/g, " ")}
                  </p>
                </div>
              </div>
            ))}
            <Link href="/admin/orders" className="block mt-4">
              <Button variant="outline" className="w-full">
                View All Orders
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/gifts/add" className="block">
              <Button className="w-full bg-green-500 text-black hover:bg-green-600">
                Add New Gift
              </Button>
            </Link>
            <Link href="/admin/orders" className="block">
              <Button variant="outline" className="w-full">
                Manage Orders
              </Button>
            </Link>
            <Link href="/admin/gifts" className="block">
              <Button variant="outline" className="w-full">
                Manage Gifts
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
