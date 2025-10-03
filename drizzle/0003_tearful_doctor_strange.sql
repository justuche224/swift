ALTER TABLE "gift" RENAME COLUMN "image_url" TO "image_urls";--> statement-breakpoint
ALTER TABLE "gift" ADD COLUMN "sizes" text[];