"use server";

import db from "@/db";
import { gift, order, orderItem } from "@/db/schema";
import { requireAdmin } from "@/lib/server-auth";
import { eq, desc, count, or, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type Gift = typeof gift.$inferSelect;
export type NewGift = typeof gift.$inferInsert;

export async function getAllGifts() {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const gifts = await db.select().from(gift).orderBy(gift.createdAt);
  return gifts.map((g) => ({
    ...g,
    imageUrls: g.imageUrls || [],
    sizes: g.sizes || [],
  }));
}

export async function getGiftById(id: string) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const gifts = await db.select().from(gift).where(eq(gift.id, id));
  const result = gifts[0] || null;
  if (result) {
    return {
      ...result,
      imageUrls: result.imageUrls || [],
      sizes: result.sizes || [],
    };
  }
  return result;
}

export async function createGift(
  data: Omit<NewGift, "id" | "createdAt" | "updatedAt">
) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const id = crypto.randomUUID();

  const newGift = await db
    .insert(gift)
    .values({
      id,
      ...data,
    })
    .returning();

  revalidatePath("/admin/gifts");
  return newGift[0];
}

export async function updateGift(
  id: string,
  data: Partial<Omit<NewGift, "id" | "createdAt" | "updatedAt">>
) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const updatedGift = await db
    .update(gift)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(gift.id, id))
    .returning();

  revalidatePath("/admin/gifts");
  revalidatePath(`/admin/gifts/${id}`);
  return updatedGift[0];
}

export async function deleteGift(id: string) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  await db.delete(gift).where(eq(gift.id, id));

  revalidatePath("/admin/gifts");
  return { success: true };
}

export async function toggleGiftStatus(id: string, isActive: boolean) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const updatedGift = await db
    .update(gift)
    .set({ isActive, updatedAt: new Date() })
    .where(eq(gift.id, id))
    .returning();

  revalidatePath("/admin/gifts");
  return updatedGift[0];
}

export async function getAllOrders(page = 1, limit = 20) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const offset = (page - 1) * limit;

  const [totalCountResult] = await db.select({ count: count() }).from(order);

  const totalCount = totalCountResult.count;
  const totalPages = Math.ceil(totalCount / limit);

  const orders = await db
    .select()
    .from(order)
    .orderBy(desc(order.createdAt))
    .limit(limit)
    .offset(offset);

  return {
    orders,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      limit,
    },
  };
}

export async function searchOrders(searchQuery: string, page = 1, limit = 20) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const offset = (page - 1) * limit;

  const searchCondition = searchQuery
    ? or(
        ilike(order.trackingId, `%${searchQuery}%`),
        ilike(order.recipientName, `%${searchQuery}%`),
        ilike(order.recipientEmail, `%${searchQuery}%`)
      )
    : undefined;

  const [totalCountResult] = await db
    .select({ count: count() })
    .from(order)
    .where(searchCondition);

  const totalCount = totalCountResult.count;
  const totalPages = Math.ceil(totalCount / limit);

  const orders = await db
    .select()
    .from(order)
    .where(searchCondition)
    .orderBy(desc(order.createdAt))
    .limit(limit)
    .offset(offset);

  return {
    orders,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      limit,
    },
  };
}

export async function getOrderById(orderId: string) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const [orderData] = await db
    .select()
    .from(order)
    .where(eq(order.id, orderId));

  if (!orderData) {
    return null;
  }

  const items = await db
    .select()
    .from(orderItem)
    .where(eq(orderItem.orderId, orderId));

  return {
    ...orderData,
    items,
  };
}

export async function updateOrderStatus(orderId: string, status: string) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const validStatuses = [
    "pending",
    "processing",
    "in_transit",
    "delivered",
    "cancelled",
  ];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status");
  }

  const [updatedOrder] = await db
    .update(order)
    .set({ status, updatedAt: new Date() })
    .where(eq(order.id, orderId))
    .returning();

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  return updatedOrder;
}

export async function deleteOrder(orderId: string) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  await db.delete(order).where(eq(order.id, orderId));

  revalidatePath("/admin/orders");
  return { success: true };
}
