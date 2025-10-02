"use server";

import { gift } from "@/db/schema";
import db from "@/db";
import { and, eq, count } from "drizzle-orm";

export async function getAllGifts(page = 1, limit = 12) {
  const offset = (page - 1) * limit;

  const [totalCountResult] = await db
    .select({ count: count() })
    .from(gift)
    .where(eq(gift.isActive, true));

  const totalCount = totalCountResult.count;
  const totalPages = Math.ceil(totalCount / limit);

  const gifts = await db
    .select({
      id: gift.id,
      name: gift.name,
      description: gift.description,
      price: gift.price,
      image: gift.imageUrl,
      category: gift.category,
      stock: gift.stock,
    })
    .from(gift)
    .orderBy(gift.createdAt)
    .where(eq(gift.isActive, true))
    .limit(limit)
    .offset(offset);

  return {
    gifts,
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

export async function getGiftById(id: string) {
  const gifts = await db
    .select({
      id: gift.id,
      name: gift.name,
      description: gift.description,
      price: gift.price,
      image: gift.imageUrl,
      category: gift.category,
      stock: gift.stock,
    })
    .from(gift)
    .where(and(eq(gift.id, id), eq(gift.isActive, true)));
  return gifts[0] || null;
}
