CREATE TABLE "order" (
	"id" text PRIMARY KEY NOT NULL,
	"tracking_id" text NOT NULL,
	"recipient_name" text NOT NULL,
	"recipient_email" text NOT NULL,
	"recipient_phone" text NOT NULL,
	"recipient_address" text NOT NULL,
	"recipient_city" text,
	"recipient_zip_code" text,
	"gift_message" text,
	"total_amount" numeric(10, 2) NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"estimated_arrival" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "order_tracking_id_unique" UNIQUE("tracking_id")
);
--> statement-breakpoint
CREATE TABLE "order_item" (
	"id" text PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"gift_id" text NOT NULL,
	"gift_name" text NOT NULL,
	"gift_image" text NOT NULL,
	"gift_price" numeric(10, 2) NOT NULL,
	"quantity" integer NOT NULL,
	"size" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE cascade ON UPDATE no action;