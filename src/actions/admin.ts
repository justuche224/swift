"use server";

import db from "@/db";
import { gift } from "@/db/schema";
import { requireAdmin } from "@/lib/server-auth";
import { eq } from "drizzle-orm";
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
