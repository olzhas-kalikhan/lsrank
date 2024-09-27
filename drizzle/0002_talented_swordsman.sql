CREATE TABLE IF NOT EXISTS "lsrank_list_items" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"list_id" varchar(255) NOT NULL,
	"name" varchar(255),
	"score" double precision,
	"meta_id" varchar(255),
	"url" text,
	CONSTRAINT "lsrank_list_items_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lsrank_lists" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"name" varchar(255),
	"type" varchar(255) NOT NULL,
	CONSTRAINT "lsrank_lists_user_id_name_unique" UNIQUE("user_id","name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lsrank_list_items" ADD CONSTRAINT "lsrank_list_items_list_id_lsrank_lists_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."lsrank_lists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lsrank_lists" ADD CONSTRAINT "lsrank_lists_user_id_lsrank_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."lsrank_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "list_item_list_id_idx" ON "lsrank_list_items" USING btree ("list_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "list_user_id_idx" ON "lsrank_lists" USING btree ("user_id");