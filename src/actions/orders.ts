"use server";

import db from "@/db";
import { order, orderItem } from "@/db/schema";
import { eq } from "drizzle-orm";

interface OrderItemInput {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image: string;
}

interface RecipientInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  message: string;
}

function generateTrackingId(): string {
  const prefix = "SWIFT";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

function generateOrderId(): string {
  return `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function generateOrderItemId(): string {
  return `item_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function calculateEstimatedArrival(): Date {
  const today = new Date();
  const daysToAdd = Math.floor(Math.random() * 3) + 5;
  today.setDate(today.getDate() + daysToAdd);
  return today;
}

export async function createOrder(
  items: OrderItemInput[],
  recipient: RecipientInfo,
  totalAmount: number
) {
  try {
    const orderId = generateOrderId();
    const trackingId = generateTrackingId();
    const estimatedArrival = calculateEstimatedArrival();

    await db.insert(order).values({
      id: orderId,
      trackingId,
      recipientName: recipient.name,
      recipientEmail: recipient.email,
      recipientPhone: recipient.phone,
      recipientAddress: recipient.address,
      recipientCity: recipient.city,
      recipientZipCode: recipient.zipCode,
      giftMessage: recipient.message,
      totalAmount: totalAmount.toString(),
      status: "pending",
      estimatedArrival,
    });

    const orderItemsData = items.map((item) => ({
      id: generateOrderItemId(),
      orderId,
      giftId: item.id,
      giftName: item.name,
      giftImage: item.image,
      giftPrice: item.price.toString(),
      quantity: item.quantity,
      size: item.size,
    }));

    await db.insert(orderItem).values(orderItemsData);

    console.log("=== ORDER CREATED ===");
    console.log(
      JSON.stringify(
        {
          orderId,
          trackingId,
          items: orderItemsData,
          recipient,
          totalAmount,
          status: "pending",
          estimatedArrival: estimatedArrival.toISOString(),
          createdAt: new Date().toISOString(),
        },
        null,
        2
      )
    );
    console.log("====================");

    return {
      success: true,
      trackingId,
      orderId,
      estimatedArrival: estimatedArrival.toISOString(),
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      error: "Failed to create order",
    };
  }
}

export async function getOrderByTrackingId(trackingId: string) {
  try {
    const [orderData] = await db
      .select()
      .from(order)
      .where(eq(order.trackingId, trackingId));

    if (!orderData) {
      return null;
    }

    const items = await db
      .select()
      .from(orderItem)
      .where(eq(orderItem.orderId, orderData.id));

    return {
      ...orderData,
      items,
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}
