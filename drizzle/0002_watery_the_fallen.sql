ALTER TABLE "gift" RENAME COLUMN "image" TO "image_url";--> statement-breakpoint
ALTER TABLE "gift" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gift" ALTER COLUMN "category" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gift" ADD COLUMN "stock" integer DEFAULT 0 NOT NULL;