"use server";

import { gift } from "@/db/schema";
import db from "@/db";
import { and, eq, count, or, ilike } from "drizzle-orm";

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
      images: gift.imageUrls,
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

export async function searchGifts(searchQuery: string, page = 1, limit = 12) {
  const offset = (page - 1) * limit;

  const searchCondition = searchQuery
    ? or(
        ilike(gift.name, `%${searchQuery}%`),
        ilike(gift.description, `%${searchQuery}%`),
        ilike(gift.category, `%${searchQuery}%`)
      )
    : undefined;

  const whereCondition = searchCondition
    ? and(searchCondition, eq(gift.isActive, true))
    : eq(gift.isActive, true);

  const [totalCountResult] = await db
    .select({ count: count() })
    .from(gift)
    .where(whereCondition);

  const totalCount = totalCountResult.count;
  const totalPages = Math.ceil(totalCount / limit);

  const gifts = await db
    .select({
      id: gift.id,
      name: gift.name,
      description: gift.description,
      price: gift.price,
      images: gift.imageUrls,
      category: gift.category,
      stock: gift.stock,
    })
    .from(gift)
    .where(whereCondition)
    .orderBy(gift.createdAt)
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
      images: gift.imageUrls,
      category: gift.category,
      stock: gift.stock,
      sizes: gift.sizes,
    })
    .from(gift)
    .where(and(eq(gift.id, id), eq(gift.isActive, true)));
  return gifts[0] || null;
}

export async function getRelatedGifts(
  category: string,
  excludeId?: string,
  limit = 6
) {
  if (!category) return [];
  const gifts = await db
    .select({
      id: gift.id,
      name: gift.name,
      description: gift.description,
      price: gift.price,
      images: gift.imageUrls,
      category: gift.category,
      stock: gift.stock,
    })
    .from(gift)
    .where(and(eq(gift.category, category), eq(gift.isActive, true)))
    .orderBy(gift.createdAt)
    .limit(limit);

  const filtered = excludeId ? gifts.filter((g) => g.id !== excludeId) : gifts;
  return filtered.slice(0, limit);
}
